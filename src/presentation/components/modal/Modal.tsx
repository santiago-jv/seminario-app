import './styles.css'
import styled from 'styled-components'

function Modal({children, estado, cambiarEstado}:any){ 

    return(
        <>
            {estado &&
                <Overlay>
                    <ContenedorModal>
                        <EncabezadoModal>
                            
                        </EncabezadoModal>

                        <BotonCerrar onClick={()=> cambiarEstado(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor"  viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </BotonCerrar>
                        {children}
                    </ContenedorModal>
                </Overlay>
            }
        </>
    )
}

const Overlay = styled.div`
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .5);

        display: flex;
        align-items: center;
        justify-content: center;
    `;
    const ContenedorModal = styled.div`
        width: 300px;
        min-height: 200px;
        background-color: #fff;
        position: relative;
        border-radius: 5px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        padding: 20px;
    `;
    const EncabezadoModal = styled.div`
        display: flex;
        align-items:center;
        justify-content:space-between;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #E8E8E8;

        h3 {
            font-weight: 500;
            font-size: 16px;
            color: #AE4565;
        }
    `;
    const BotonCerrar = styled.div`
        position: absolute;
        top: 11px;
        right: 11px;
        width: 30px;
        height: 30px;
        border:none;
        background:none;
        cursor: pointer;
        transition: .3s ease all;
        border-radius: 5px;
        color: #AE4565;
        

        svg{
            width: 100%;
            height: 100%;
        }        
    `;
export default  Modal