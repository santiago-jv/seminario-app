import './Styles.css'
import { useState } from "react";

const Order = () => {
  const [currentView, setCurrentView] = useState("OrderStatus")

  const view1 = (
    <>
      <div className="order-contend">
        <img className='order-contend-img' src="/confetti.svg" alt="" />
        <h1 className='order-contend-title'>Esperando por pago</h1>
        <img className='order-contend-img1' src="/Asset 1.svg" alt="" />
        <div className='order-contend-state'>
          <img src="/Loading bar.svg" alt="" />
          <p className='order-state'>Estado del pedido</p>
        </div>
        <button className='order-contend-pay' onClick={()=>setCurrentView("PayOrder")}>Pagar</button>
      </div>
      
    </>
  );

  const view2 = (
    <>
    <div className='pay-contend'>
        <div className='pay-contend-bar'>Pagos</div>

        <p className='pay-title'>Por favor revisa los detalles del pedido</p>

        <div className='pay-contend-info'>
            <div className='pay-contend-order'>
                <img src="/Group.svg" alt="" />
                <p>Pedido</p>
            </div>
            <div className='container-pay'>
                <p className='pay-contend-p'>Entidad de pago</p>
                <p className='pay-contend-p1'>Nequi</p>
            </div>
            <div className='container-pay'>
                <p className='pay-contend-p'>Tipo de factura</p>
                <p className='pay-contend-p1'>Orden de comida</p>
            </div>
            <div className='container-pay'>
                <p className='pay-contend-p'>numero de factura</p>
                <p className='pay-contend-p1'>NN00111345</p>
            </div>
            <div className='container-pay'>
                <p className='pay-contend-p'>Id de transacción</p>
                <p className='pay-contend-p1'>EUE0111345</p>
            </div>
            <div className='container-pay'>
                <p className='pay-contend-p'>Pedido</p>
                <p className='pay-contend-p1'>Ensalada de salmon</p>
                <p className='pay-contend-p1'>Macaroni de pasta</p>
                <p className='pay-contend-p1'>Fried ice</p>
            </div>
            <div className='container-pay'>
                <p className='pay-contend-p'>Monto a pagar</p>
                <p className='pay-contend-p1'>N20,000.00</p>
            </div>
        </div>
        
        <button className='pay-contend-conf' onClick={()=>setCurrentView("OrderPaid")}>Confirmar</button>
        
    </div>
      
    </>
  );

  const view3 = (
    <>
    
    <div className='order-contend'>
      <div className='order-contend-img'>
        <img  src="/confetti.svg" alt="" />
      </div>

      <h1 className='order-contend-title'>Pago realizado</h1>

      <div className='order-contend-img1'>
        <img src="/Asset 5.svg" alt="" />
      </div>

      <div className='order-contend-state'>
        <img src="/Loading bar.svg" alt="" />
        <p>Estado del pedido</p>
      </div>
      
    </div>
     
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
