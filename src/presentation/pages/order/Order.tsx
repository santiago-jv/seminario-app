import { useParams } from "react-router-dom";
import "./Styles.css";
import { useEffect, useState } from "react";
import { OrderStatus } from "../dashboard/orders/Orders";
import { database } from "../../../infrastructure/firebase/config/firebase.config";
import { equalTo, get, onValue, orderByChild, query, ref, set } from "firebase/database";

const Order = () => {
  const [currentView, setCurrentView] = useState("OrderStatus");
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { orderId } = useParams();

  const payOrder = async () => {};

  const getOrderById = async () => {
    try {
      const reference = ref(database, "orders");
      const queryBy =  query(reference, orderByChild("id"), equalTo(orderId!));
  
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



    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getOrderById();
  }, []);

  const handleStatusChange = async () => {
    try {
      let newStatus;

      if (order.status === OrderStatus.READY_FOR_PAY) {
        newStatus = OrderStatus.ORDER_PAID;
      }
      const orderRef = ref(database, `orders/${order.id}`);
      await set(orderRef, { ...order, status: newStatus });

      setOrder({ ...order, status: newStatus });
    } catch (error) {
      console.error("Error al cambiar el estado de la orden", error);
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

  const view1 = order && (
    <>
      <div className="order-contend">
        <img className="order-contend-img" src="/confetti.svg" alt="" />
        {order.status === OrderStatus.READY_FOR_ACCEPT ? (
          <>
            <div
            style={{ marginTop: "2em", marginBottom: "1em" }}
            className="loader"
          ></div>
            <h1 style={{ textAlign: "center" }} className="order-contend-title">
              Esperando a que el restaurante confirme la orden
            </h1>
          </>
        ) : (
          <>
            <h1 className="order-contend-title">Realiza tu pago</h1>
            <button
              className="order-contend-pay"
              onClick={() => setCurrentView("PayOrder")}
            >
              Pagar
            </button>
          </>
        )}
      </div>
    </>
  );

  const view2 = (
    <>
      <div className="pay-contend">
        <div className="pay-contend-bar">Pagos</div>

        <p className="pay-title">Por favor revisa los detalles del pedido</p>

        <div className="pay-contend-info">
          <div className="pay-contend-order">
            <img src="/Group.svg" alt="" />
            <p>Pedido</p>
          </div>
          <div className="container-pay">
            <p className="pay-contend-p">Entidad de pago</p>
            <p className="pay-contend-p1">Nequi</p>
          </div>
          <div className="container-pay">
            <p className="pay-contend-p">Tipo de factura</p>
            <p className="pay-contend-p1">Orden de comida</p>
          </div>
          <div className="container-pay">
            <p className="pay-contend-p">numero de factura</p>
            <p className="pay-contend-p1">NN00111345</p>
          </div>
          <div className="container-pay">
            <p className="pay-contend-p">Id de transacción</p>
            <p className="pay-contend-p1">EUE0111345</p>
          </div>
          <div className="container-pay">
            <p className="pay-contend-p">Pedido</p>
            <p className="pay-contend-p1">Ensalada de salmon</p>
            <p className="pay-contend-p1">Macaroni de pasta</p>
            <p className="pay-contend-p1">Fried ice</p>
          </div>
          <div className="container-pay">
            <p className="pay-contend-p">Monto a pagar</p>
            <p className="pay-contend-p1">N20,000.00</p>
          </div>
        </div>

        <button
          className="pay-contend-conf"
          onClick={() => {
            setCurrentView("OrderPaid");
            handleStatusChange();
          }}
        >
          Confirmar
        </button>
      </div>
    </>
  );

  const view3 = (
    <>
      {order && (
        <div className="order-contend">
          <div className="order-contend-img">
            <img src="/confetti.svg" alt="" />
          </div>

          <h1 className="order-contend-title">Pago realizado</h1>

          <div className="order-contend-img1">
            <img src="/Asset 5.svg" alt="" />
          </div>

          <div className="order-contend-state">
           
            <h3>Estado del pedido: {definedStatusLabel()}</h3>
          </div>
        </div>
      )}
    </>
  );

  switch (currentView) {
    case "OrderStatus":
      return view1;
    case "PayOrder":
      return view2;
    case "OrderPaid":
      return view3;
  }
};

export default Order;
