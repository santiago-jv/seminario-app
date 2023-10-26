import { Outlet } from "react-router-dom";
import NavigationBar from "../../components/navigation-bar/NavigationBar";

const Dashboard = () => {
    return (
        <div>
            <NavigationBar /> <Outlet />
        </div>
    );
};

export default Dashboard;
