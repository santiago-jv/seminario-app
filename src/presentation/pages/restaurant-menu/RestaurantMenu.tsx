import { useState, useEffect } from "react";
import { database } from "../../../infrastructure/firebase/config/firebase.config";
import { get, ref } from "firebase/database";
import ButtonFoodType from "../../components/button-food-type/ButtonFoodType";
import { v4 as uuidv4 } from "uuid";
import Foodcard from "../../components/food-card/FoodCard";
import { FaShoppingCart } from 'react-icons/fa';
import Modal from "../../components/modal/Modal";
import styled from "styled-components";
import './Resmenu.css'


const ResutaurantMenu = () => {
  const [categorySelected, setCategorySelected] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const [filteredProducts, setFilteredProducts] = useState<any>([]);
  const [quantity, setQuantity] = useState(1);
  const [shopOrder, setShopOrder] = useState<any>({
    total: 0,
    order: [],
  });
  const [cartModalContent, setCartModalContent] = useState<any>([]);
  const [showCartModal, setShowCartModal] = useState(false);

  

  const handleAddProduct = () => {
    const total = getTotalPrice();
    const newCartItem = { product: selectedProduct, quantity, total };
  
    // Actualiza el estado del pedido
    setShopOrder({
      ...shopOrder,
      order: [...shopOrder.order, newCartItem],
    });
  
    // Actualiza el estado del contenido del carrito del modal
    setCartModalContent((prevCartModalContent: any) => {
      if (Array.isArray(prevCartModalContent)) {
        return [...prevCartModalContent, newCartItem];
      } else {
        console.error("prevCartModalContent is not an array:", prevCartModalContent);
        // Manejar el error o retornar un valor predeterminado
        return prevCartModalContent;
      }
    });
  
    // Cierra el modal del producto
    cambiarEstadoModal2(false);
  };

  const handleCartIconClick = () => {
    if (cartModalContent.length > 0) {
      const total = cartModalContent.reduce(
        (acc: number, item: { total: number }) => acc + item.total,
        0
      );
      const cartContent = { order: cartModalContent, total };
      setCartModalContent(cartContent);
      setShowCartModal(prevState => !prevState);
    }
  };
  
  
  

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

  const handleProductClick = (product:any) => {
    setSelectedProduct(product); // Actualiza el estado con la tarjeta seleccionada
    setQuantity(1);
    cambiarEstadoModal2(true); // Abre el modal
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const getTotalPrice = () => {
    if (selectedProduct) {
      return selectedProduct.price * quantity;
    }
    return 0;
  };

 
  

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
              onClick={()=> handleProductClick(product)}
            />
          ))}

         <Modal 
          estado={estadoModal2}
          cambiarEstado={cambiarEstadoModal2}
         >
          <Contend>
            {selectedProduct &&
              <div className="contendmodal" key={uuidv4()}>
                <div className="contendmodal-img">
                  <img className="foodmodal" src={selectedProduct.imageUrl} alt="" />
                </div>
                <h1 className="contendmodal-titile">{selectedProduct.name}</h1>
                <p className="contendmodal-descrip">{selectedProduct.description}</p>
                <p className="contendmodal-price">{selectedProduct.price}</p>
                
                <div className="contendmodal-quantity">
                  <div className="container-quantity">
                    <button className="quantity-button" onClick={()=> handleQuantityChange(quantity - 1)} disabled={quantity <= 1}>-</button>
                    <p className="quantity-modal">{quantity}</p>
                    <button className="quantity-button" onClick={()=> handleQuantityChange(quantity + 1)} >+</button> 
                  </div>
                </div>
                 <p>Total: {getTotalPrice()}</p>

                 <div className="contendmodal-quantity-card">
                  <button onClick={handleAddProduct}>Agregar al carrito</button>
                 </div>

              </div>
            }
          </Contend>

         </Modal>
            
        </div>
        <nav className="nav">
          <FaShoppingCart  className="nav__icon" size={20} color="white" onClick={handleCartIconClick} />
          {showCartModal && (
      <Modal estado={showCartModal} cambiarEstado={setShowCartModal}>
        <Contend>
          {cartModalContent && (
            <div className="contendmodal" key={uuidv4()}>
              <h2>Carrito de compras</h2>
              {cartModalContent &&
                cartModalContent.order.map((item: { product: { name:any, imageUrl: any }; quantity: number; total: number }, index: number) => (
                  <div key={index}>
                    <div className="cartcontendp">
                      <div className="cartimgUrl">
                        <img className="siceimg"  src={item.product.imageUrl} alt="" />
                        <div className="namecart">
                        <p>{item.product.name}</p>
                      </div>
                      <div>
                        <p>x{item.quantity}</p>
                      </div>
                      <div>
                        <p>${item.total}</p>
                      </div>
                      </div>
                    </div>
                  </div>
                ))
              }
              <p className="cartall">Total: {cartModalContent.total}</p>
              <button onClick={() => setShowCartModal(false)}>Cerrar</button>
            </div>
          )}
        </Contend>
      </Modal>
    )}
        
        </nav>
      </div>
    </>
  );
};

const Contend = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:20px;
  `;

export default ResutaurantMenu;
