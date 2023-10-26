import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Orders from "../pages/dashboard/orders/Orders";
import RestaurantMenu from "../pages/restaurant-menu/RestaurantMenu";
import Login from "../pages/login/Login";
import { PrivateRoute } from "./private.routes";

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="auth/login" element={<Login />} />
                <Route
                    path="dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                >
                    <Route path="orders" element={<Orders />} />
                </Route>
                <Route path="restaurants/:id/menu" element={<RestaurantMenu />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesApp;
