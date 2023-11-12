import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Orders from "../pages/dashboard/orders/Orders";
import RestaurantMenu from "../pages/restaurant-menu/RestaurantMenu";
import Login from "../pages/login/Login";
import { PrivateRoute } from "./private.routes";
import ProductList from "../pages/dashboard/products/products-list/ProductList";

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/admin/products" />} />
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
                    <Route path="products" element={<ProductList />} />
                </Route>

                <Route
                    path="admin"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                >
                    <Route path="orders" element={<Orders />} />
                    <Route path="products" element={<ProductList />} />
                </Route>
                <Route path="restaurants/menu" element={<RestaurantMenu />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesApp;
