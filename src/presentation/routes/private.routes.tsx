import { LocalDBKeys } from "../../global.constants";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = localStorage.getItem(LocalDBKeys.AUTH) !== null;

    if (!isAuthenticated) {
        return <Navigate to={"/auth/login"} />;
    }
    return children;
};
