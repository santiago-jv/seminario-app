import { useState, useEffect } from "react";
import { database } from "../../../../infrastructure/firebase/config/firebase.config";
import { get, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import "./board.css"
const Boards = () => {
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();
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
  );
};

export default Boards;
