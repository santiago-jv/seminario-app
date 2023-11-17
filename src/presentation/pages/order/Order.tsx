import { useState } from "react";

const Order = () => {
  const [currentView, setCurrentView] = useState("OrderStatus")

  const view1 = (
    <>
      <h1>Vista 1</h1>
      <button onClick={()=>setCurrentView("PayOrder")}>Pagar</button>
    </>
  );

  const view2 = (
    <>
      <h1>Vista 2</h1>
      <button onClick={()=>setCurrentView("OrderPaid")}>Next</button>
    </>
  );

  const view3 = (
    <>
      <h1>Vista 3</h1>
     
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
