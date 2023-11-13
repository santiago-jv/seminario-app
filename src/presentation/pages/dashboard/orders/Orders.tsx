import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { equalTo, get, onValue, orderByChild, query, ref, set } from 'firebase/database';
import { database } from '../../../../infrastructure/firebase/config/firebase.config';
import { v4 as uuidv4 } from 'uuid';

interface Order {
  id: string;
  boardId: string;
  status: string;
  total: number;
  order: { product: Product; quantity: number }[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
}

export enum OrderStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  IN_PROGRESS = 'IN_PROGRESS',
}

const Orders: React.FC = () => {
  const { boardId } = useParams();

  const [board, setBoard] = useState<any>(null);
  const [order, setOrder] = useState<any>(null);

  const getBoardById = async () => {
    try {
      const reference = ref(database, 'boards');
      const queryBy = query(reference, orderByChild('id'), equalTo(boardId!));
      const snapshot = await get(queryBy);

      const snapshotValue = snapshot.val();
      const firstKey = Object.keys(snapshotValue)[0];
      setBoard(snapshotValue[firstKey]);
    } catch (error) {
      console.error(error);
    }
  };

  const getOrdersByBoardId = (boardId: string) => {
    const reference = ref(database, 'orders');
    const queryBy = query(reference, orderByChild('boardId'), equalTo(boardId));

    const unsubscribe = onValue(queryBy, (snapshot) => {
      const snapshotValue = snapshot.val();

      if (snapshotValue) {
        const filteredOrders = Object.values(snapshotValue).filter((order: any) => order.status === OrderStatus.ACTIVE);

        if (filteredOrders.length > 0) {
          const firstOrder = filteredOrders[0];
          setOrder(firstOrder);
        } else {
          console.log('No se encontraron órdenes activas para el boardId especificado.');
        }
      } else {
        console.log('No se encontraron órdenes para el boardId especificado.');
      }
    });

  
  };

  const handleStatusChange = async () => {
    try {
      let newStatus;

      // Determinar el nuevo estado basado en el estado actual
      if (order.status === OrderStatus.ACTIVE) {
        newStatus = OrderStatus.IN_PROGRESS;
      } else if (order.status === OrderStatus.IN_PROGRESS) {
        newStatus = OrderStatus.COMPLETED;
      } else {
        // Puedes manejar otros casos si es necesario
        return;
      }

      // Actualizar el estado en la base de datos
      const orderRef = ref(database, `orders/${order.id}`);
      await set(orderRef, { ...order, status: newStatus });

      // Actualizar el estado local
      setOrder({ ...order, status: newStatus });
    } catch (error) {
      console.error('Error al cambiar el estado de la orden', error);
    }
  };
  useEffect(() => {
    getBoardById();
    getOrdersByBoardId(boardId!);
  }, [boardId]);

  return (
    order &&
    board ? (
      <div className='orders'>
        <h1>{board.name}</h1>
        <h2 className='order-id'>Identificador de la orden: {order.id}</h2>
        <h2 className='order-id'>Total de la orden: {order.total}</h2>

        <h3>Estado: {order?.status}</h3>

        <button onClick={handleStatusChange}>
        {order.status === OrderStatus.ACTIVE
          ? 'Pasar a En Progreso'
          : order.status === OrderStatus.IN_PROGRESS
          ? 'Marcar como Completado'
          : 'Estado Desconocido'}
      </button>
        {/* ... other components */}
      </div>
    ):
    <h1> No se encontraron ordenes activas para esta mesa</h1>
  );
};

export default Orders;
