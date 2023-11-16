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

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
}

export enum OrderStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  IN_PROGRESS = "IN_PROGRESS",
}

const Orders: React.FC = () => {
  const { boardId } = useParams();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [estadoModal1, cambiarEstadoModal1] = useState(false);

  const [board, setBoard] = useState<any>(null);
  const [order, setOrder] = useState<any>(null);
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
  };

  const getOrdersByBoardId = (boardId: string) => {
    const reference = ref(database, "orders");
    const queryBy = query(reference, orderByChild("boardId"), equalTo(boardId));

    onValue(queryBy, (snapshot) => {
      const snapshotValue = snapshot.val();

      if (snapshotValue) {
        const filteredOrders = Object.values(snapshotValue).filter(
          (order: any) => order.status === OrderStatus.ACTIVE
        );

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

      if (order.status === OrderStatus.ACTIVE) {
        newStatus = OrderStatus.IN_PROGRESS;
      } else if (order.status === OrderStatus.IN_PROGRESS) {
        newStatus = OrderStatus.COMPLETED;
      } else {
        return;
      }

      const orderRef = ref(database, `orders/${order.id}`);
      await set(orderRef, { ...order, status: newStatus });

      setOrder({ ...order, status: newStatus });
    } catch (error) {
      console.error("Error al cambiar el estado de la orden", error);
    }
  };

  useEffect(() => {
    getBoardById();
    getOrdersByBoardId(boardId!);
  }, [boardId]);

  return order && board ? (
    <div className="orders">
      <h1>{board.name}</h1>
      <h2 className="order-id">Identificador de la orden: {order.id}</h2>
      <h2 className="order-id">Total de la orden: {order.total}</h2>

      <h3>Estado: {order?.status}</h3>

      <button onClick={handleStatusChange}>
        {order.status === OrderStatus.ACTIVE
          ? "Pasar a En Progreso"
          : order.status === OrderStatus.IN_PROGRESS
          ? "Marcar como Completado"
          : "Estado Desconocido"}
      </button>
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
