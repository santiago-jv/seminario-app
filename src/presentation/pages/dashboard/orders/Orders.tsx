import React, { useState } from 'react';
import { Box, Typography, Modal } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

interface Order {
  id: string;
  title: string;
  status: string;
  description: string;
}

const initialOrders: Order[] = [
  { id: 'order1', title: 'Orden 1', status: 'Recibida', description: 'Detalles de la Orden 1' },
  { id: 'order2', title: 'Orden 2', status: 'En proceso', description: 'Detalles de la Orden 2' },
  { id: 'order3', title: 'Orden 3', status: 'Terminada', description: 'Detalles de la Orden 3' },
];

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const updatedOrders = [...orders];
    const [movedOrder] = updatedOrders.splice(result.source.index, 1);
    updatedOrders.splice(result.destination.index, 0, movedOrder);

    setOrders(updatedOrders);
  };

  const handleOrderClick = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    setSelectedOrder(order || null);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div>
      <Typography variant="h4">Orders</Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="order-sections">
          {['Recibidas', 'En proceso', 'Terminada'].map((status) => (
            <div key={status} className="order-section">
              <Typography variant="h6">{status}</Typography>
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="order-list"
                  >
                    {orders
                      .filter((order) => order.status === status)
                      .map((order, index) => (
                        <Draggable key={order.id} draggableId={order.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => handleOrderClick(order.id)}
                              className="order-item"
                            >
                              {order.title}
                            </div>
                          )}
                        </Draggable>
                      ))}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <Modal open={!!selectedOrder} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography variant="h5">{selectedOrder?.title}</Typography>
          <Typography>{selectedOrder?.description}</Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Orders;
