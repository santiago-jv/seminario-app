import React, { useState } from "react";
import { LoginRequest } from "../../../infrastructure/firebase/requests/login.request";
import { toast } from "sonner";
import useAuthStore from "../../store";
import { UserModel } from "../../../domain/models/auth/user.model";
import { INITIAL_LOGIN_DATA_STATE } from "./constants";
import { Form, useNavigate } from "react-router-dom";
import "./style.css";
import { Logo } from "../../components/Logo";



function Login() {
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

    
        <div className="login" >
            <div className="overlap-group">
                <form onSubmit={onSubmit} className="frame-2">
                    <div className="text-wrapper-4">Login</div>
                    <div className="frame-wrapper">
                        <div className="frame-3">
                            <div className="input-text-2" >Email</div>
                            <input className="input" name="email"  type="email" id="email" onChange={onChange} value={loginData.email}/>
                        </div>
                    </div>
                <div className="frame-wrapper">
                    <div className="frame-4">
                        <div className="input-text-2" >Password</div>
                        
                        <input className="input"  type="Password" name="password" id="password"onChange={onChange} value={loginData.password} />
                    </div>
                </div>
          <div className="text-wrapper-5">Forgot password?</div>
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="logo-wrapper">
        <Logo
          black
          blackYesTextYesClassName="logo-instance"
          divClassName="logo-2"
          divClassNameOverride="logo-3"
          text
          vector="https://c.animaapp.com/97NXPzId/img/vector.svg"
          vectorClassName="design-component-instance-node"
        />
      </div>
    </div>

    

        /*<Container maxWidth="sm">



            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Paper elevation={3} style={{ padding: "16px", width: "100%" }}>
                    <Typography variant="h4" component="h1" align="center" fontFamily={"initial"} color="primary" >
                        INICIO DE SESIÓN
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
                            margin="normal" />
                        <TextField
                            fullWidth
                            label="Password"
                            variant="outlined"
                            type="password"
                            name="password"
                            id="password"
                            onChange={onChange}
                            value={loginData.password}
                            margin="normal" />
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
        </Container>*/
    );
}

export default Login;

//admin@emprendimiento.org
//admin_123456
