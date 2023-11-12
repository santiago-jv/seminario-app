import { useState, useEffect } from "react";
import { database } from "../../../infrastructure/firebase/config/firebase.config";
import { get, ref } from "firebase/database";
import ButtonFoodType from "../../components/button-food-type/ButtonFoodType";
import { v4 as uuidv4 } from "uuid";
import Foodcard from "../../components/food-card/FoodCard";
import { FaShoppingCart } from 'react-icons/fa';


const ResutaurantMenu = () => {
  const [categorySelected, setCategorySelected] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const getProductList = async () => {
    try {
      const productsRef = ref(database, "products");

      const snapshot = await get(productsRef);

      const products = snapshot.val();
      console.log(Object.values(products));
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
  };

  useEffect(() => {
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

  return (
    <>
      <div className="home-content">
        <div className="top-log-out">
          <div>
            <h1
              className="tittle"
              style={{ textAlign: "center", fontSize: "2rem" }}
            >
              Bienvenido
            </h1>
            <div className="line"></div>
          </div>
        </div>

        <div>
          <h2 className="titel-food_type" style={{ fontSize: "1.5rem" }}>
            Tipo de comida
          </h2>
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
        <h3 className="titel-popular" style={{ fontSize: "1.5rem" }}>
          Menú
        </h3>
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
        <nav className="nav">
          <FaShoppingCart  className="nav__icon" size={20} color="white"  />
        </nav>
      </div>
    </>
  );
};

export default ResutaurantMenu;
