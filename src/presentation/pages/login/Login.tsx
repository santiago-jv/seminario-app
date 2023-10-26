import React, { useState } from "react";
import { LoginRequest } from "../../../infrastructure/firebase/requests/login.request";
import { toast } from "sonner";
import useAuthStore from "../../store";
import { UserModel } from "../../../domain/models/auth/user.model";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { INITIAL_LOGIN_DATA_STATE } from "./constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [loginData, setLoginData] = useState<LoginRequest>(INITIAL_LOGIN_DATA_STATE);
    const login = useAuthStore((state) => state.login);
    const user: UserModel | null = useAuthStore((state) => state.user);
    const navigate = useNavigate();
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            await login(loginData);
            console.log(user);
            toast.success("Bienvenido");
            navigate("/dashboard/orders");
        } catch (error) {
            toast.error("Error al iniciar sesión");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Paper elevation={3} style={{ padding: "16px", width: "100%" }}>
                    <Typography variant="h4" component="h1" align="center">
                        Inicio de sesión
                    </Typography>
                    <form onSubmit={onSubmit}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            type="email"
                            name="email"
                            id="email"
                            onChange={onChange}
                            value={loginData.email}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            variant="outlined"
                            type="password"
                            name="password"
                            id="password"
                            onChange={onChange}
                            value={loginData.password}
                            margin="normal"
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            style={{ marginTop: "16px" }}
                        >
                            Login
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;
