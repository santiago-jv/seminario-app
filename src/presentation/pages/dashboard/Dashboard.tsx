import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
         {/*    <NavigationBar /> */} <Outlet />
        </div>
    );
};

export default Dashboard;
