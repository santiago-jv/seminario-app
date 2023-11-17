import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  equalTo,
  get,
  onValue,
  orderByChild,
  query,
  ref,
  set,
} from "firebase/database";
import { database } from "../../../../infrastructure/firebase/config/firebase.config";
import styled from "styled-components";
import Modal from "../../../components/modal/Modal";
import { Link, NavLink } from "react-router-dom";
import { FaArrowCircleLeft, FaCog } from "react-icons/fa";
import "../products/products-list/styles.css";
import Loader from "../../../components/loader/Loader";
import { doc, deleteDoc } from "firebase/firestore";

export enum OrderStatus {
  READY_FOR_ACCEPT = "READY_FOR_ACCEPT",
  READY_FOR_PAY = "READY_FOR_PAY",
  ORDER_PAID = "ORDER_PAID",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

const Orders: React.FC = () => {
  const { boardId } = useParams();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [estadoModal1, cambiarEstadoModal1] = useState(false);

  const [board, setBoard] = useState<any>(null);
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getBoardById = async () => {
    try {
      const reference = ref(database, "boards");
      const queryBy = query(reference, orderByChild("id"), equalTo(boardId!));
      const snapshot = await get(queryBy);

      const snapshotValue = snapshot.val();
      const firstKey = Object.keys(snapshotValue)[0];
      setBoard(snapshotValue[firstKey]);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const getOrdersByBoardId = (boardId: string) => {
    const reference = ref(database, "orders");
    const queryBy = query(reference, orderByChild("boardId"), equalTo(boardId));

    onValue(queryBy, (snapshot) => {
      const snapshotValue = snapshot.val();

      if (snapshotValue) {
        const filteredOrders = Object.values(snapshotValue);

        if (filteredOrders.length > 0) {
          const firstOrder = filteredOrders[0];
          setOrder(firstOrder);
        } else {
          console.log(
            "No se encontraron órdenes activas para el boardId especificado."
          );
        }
      } else {
        console.log("No se encontraron órdenes para el boardId especificado.");
      }
    });
  };

  const handleStatusChange = async () => {
    try {
      let newStatus;

      if (order.status === OrderStatus.READY_FOR_ACCEPT) {
        newStatus = OrderStatus.READY_FOR_PAY;
      } else if (order.status === OrderStatus.ORDER_PAID) {
        newStatus = OrderStatus.IN_PROGRESS;
      } else if (order.status === OrderStatus.IN_PROGRESS) {
        newStatus = OrderStatus.COMPLETED;
        console.log("hola");
        const orderRef = ref(database, `orders/${order.id}`);
        setOrder({ ...order, status: newStatus });
        await set(orderRef,null);
        return
      }
  

      const orderRef = ref(database, `orders/${order.id}`);
      await set(orderRef, { ...order, status: newStatus });

      setOrder({ ...order, status: newStatus });
    } catch (error) {
      console.error("Error al cambiar el estado de la orden", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getBoardById();
    getOrdersByBoardId(boardId!);
  }, [boardId]);

  const defineStatusButtonLabel = () => {
    switch (order.status) {
      case OrderStatus.READY_FOR_ACCEPT:
        return "Aceptar orden";
      case OrderStatus.READY_FOR_PAY:
        return "Esperando pago";
      case OrderStatus.ORDER_PAID:
        return "Pasar a cocina";
      case OrderStatus.IN_PROGRESS:
        return "Marcar pedido como listo";

      default:
        return "Pedido completado";
    }
  };

  const definedStatusLabel = () => {
    switch (order.status) {
      case OrderStatus.READY_FOR_ACCEPT:
        return "Listo para aceptar";
      case OrderStatus.READY_FOR_PAY:
        return "Esperando pago";

      case OrderStatus.IN_PROGRESS:
        return "En cocina";
      case OrderStatus.ORDER_PAID:
        return "Listo para preparar";
      case OrderStatus.COMPLETED:
        return "Pedido completado";
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return order && board ? (
    <div className="orders">
      <center>
        <br></br>
        <h1>{board.name}</h1>
        <br></br>
        <h2 className="order-id">id de la orden: {order.id}</h2>
        <br></br>
        <br></br>
        <h2>Total de la orden: ${order.total}</h2>
        <br></br>
        <h3>Estado: {definedStatusLabel()}</h3>

        {order.status === OrderStatus.READY_FOR_PAY && (
          <div
            style={{ marginTop: "1em", marginBottom: "1en" }}
            className="loader"
          ></div>
        )}

        {order.status !== OrderStatus.COMPLETED && (
          <button onClick={handleStatusChange}>
            {defineStatusButtonLabel()}
          </button>
        )}
      </center>
      {/* ... other components */}
      <nav onClick={() => setIsOpenMenu(!isOpenMenu)} className="nav">
        {isOpenMenu ? (
          <FaArrowCircleLeft color="white" size={25} />
        ) : (
          <FaCog color="white" size={25} />
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
            <NavLink to="/admin/products" className="account-management link">
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
  ) : (
    <h1> No se encontraron ordenes activas para esta mesa</h1>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export default Orders;
