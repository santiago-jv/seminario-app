import { useState, useEffect } from "react";
import { database } from "../../../../infrastructure/firebase/config/firebase.config";
import { get, ref } from "firebase/database";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./board.css"
import "../products/products-list/styles.css";

import { FaArrowCircleLeft, FaCog } from "react-icons/fa";
import styled from "styled-components";
import Modal from "../../../components/modal/Modal";
const Boards = () => {
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const getBoards = async () => {
    try {
      const boardssRef = ref(database, "boards");

      const snapshot = await get(boardssRef);

      const boards = snapshot.val();
      console.log(Object.values(boards));
      setBoards(Object.values(boards));
    } catch (error) {
      console.error(error);
    }
  };

  const goToOrderDetail = (boardId:string) => {
    navigate("/admin/boards/"+boardId+"/orders");
  };

  useEffect(() => {
    getBoards();
  }, []);
  return (
    <>
     <div className="boards-container">
      <h1 className="boards__title">Mesas del restaurante</h1>
      <div className="boards">
      {boards.map((board: any) => (
        <div onClick={()=>goToOrderDetail(board.id)} className="board-card">
          <h1>{board.name}</h1>
        </div>
      ))}
      </div>
    </div>
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
    </>
      
   
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export default Boards;
