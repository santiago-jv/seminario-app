import React, { useState } from "react";
import { LoginRequest } from "../../../infrastructure/firebase/requests/login.request";
import { toast } from "sonner";
import useAuthStore from "../../store/auth";
import { UserModel } from "../../../domain/models/auth/user.model";
import { INITIAL_LOGIN_DATA_STATE } from "./constants";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Logo } from "../../components/Logo";


function Login() {
    const [loginData, setLoginData] = useState<LoginRequest>(INITIAL_LOGIN_DATA_STATE);
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            await login(loginData);
          
            toast.success("Bienvenido");
            navigate("/admin/products");
        } catch (error) {
            toast.error("Error al iniciar sesión");
        }
    };

    return (
        <main className="login-container">
    
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

    </main>
    );
}

export default Login;

//admin@emprendimiento.org
//admin_123456
