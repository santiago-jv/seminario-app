import { Link } from 'react-router-dom'
import './Styles.css'


function Pagos() {
  return (
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

        <button className='pay-contend-conf'>Confirmar</button>
    </div>
  )
}

export default Pagos