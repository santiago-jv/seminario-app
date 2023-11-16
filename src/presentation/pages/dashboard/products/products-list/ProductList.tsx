import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../../../components/modal/Modal";
import styled from "styled-components";
import Foodcard from "../../../../components/food-card/FoodCard";
import ButtonFoodType from "../../../../components/button-food-type/ButtonFoodType";
import "./styles.css";
import { database } from "../../../../../infrastructure/firebase/config/firebase.config";
import { get, ref } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { FaCog, FaArrowCircleLeft } from "react-icons/fa";
import Loader from "../../../../components/loader/Loader";

const ProductList = () => {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [categorySelected, setCategorySelected] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getProductList = async () => {
    try {
      const productsRef = ref(database, "products");

      const snapshot = await get(productsRef);

      const products = snapshot.val();
      setProducts(Object.values(products));
      setFilteredProducts(Object.values(products));
    } catch (error) {
      console.error(error);
    }
  };

  const [categories, setCategories] = useState([]);

  const getCategorieList = async () => {
    try {
      const categoriesRef = ref(database, "category");

      const snapshot = await get(categoriesRef);

      const categories = snapshot.val();
      console.log(Object.values(categories));
      setCategories(Object.values(categories));
      
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getProductList();
    getCategorieList();
  }, []);

  useEffect(() => {
    if (categorySelected) {
      const filteredProducts = products.filter(
        (product: any) => product.categoryId === categorySelected
      );
      setFilteredProducts(filteredProducts);
    } else {
      getProductList();
    }
  }, [categorySelected]);

  const closeSession = () => {
    localStorage.removeItem("auth");
    window.location.href = "/";
  };
  if(isLoading) {
    return <Loader />
  }

  return (
    <>
      <div className="home-content">
        <div className="top-log-out">
          <div>
            <h1 className="titel">Bienvenido</h1>
            <div className="line"></div>
          </div>
          <button onClick={closeSession} className="log-out">
            Cerrar sesión
          </button>
        </div>

        <div>
          <h2 className="titel-food_type">Tipo de comida</h2>
          <div className="conten-button-food-type">
            {categories.map((category: any) => (
              <ButtonFoodType
                isActive={categorySelected === category.id}
                onClick={() =>
                  setCategorySelected(
                    categorySelected === category.id ? null : category.id
                  )
                }
                key={uuidv4()}
                name={category.name}
              />
            ))}
          </div>
        </div>
        <h3 className="titel-popular">Tus productos</h3>
        <div className="types-of-dish">
          {filteredProducts.map((product: any) => (
            <Foodcard
              key={uuidv4()}
              name={product.name}
              price={product.price}
              description={product.description}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
        <nav onClick={() => setIsOpenMenu(!isOpenMenu)} className="nav">
          {isOpenMenu ? (
            <FaArrowCircleLeft  color="white" size={25} />
          ) : (
            
            <FaCog  color="white" size={25} />
          )}
        </nav>

        {isOpenMenu && (
          <ul className="dropdown">
            <div className="conteainer-menu">
              <div className="icon-logo">
                <img className="logo" src="/Vector_logo.svg" alt="" />
                <p className="name_res">LAVU’s</p>
                <p className="name_titel">Restaurante</p>
              </div>
              <button
                onClick={() => cambiarEstadoModal1(!estadoModal1)}
                className="account-management"
              >
                Manejo de Cuenta
              </button>
              <NavLink to="/admin/boards" className="account-management link">
                Manejo de Menú
              </NavLink>
              <Link to="/admin/boards" className="account-management link">
                Manejo de Mesas
              </Link>

              <Modal estado={estadoModal1} cambiarEstado={cambiarEstadoModal1}>
                <Container>
                  <NavLink
                    to="/settingofdata"
                    className="modify-button setting_data"
                  >
                    Modificar datos
                  </NavLink>
                  <button className="modify-button">Eliminar cuenta</button>
                </Container>
              </Modal>
            </div>
          </ul>
        )}
      </div>
    </>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export default ProductList;
