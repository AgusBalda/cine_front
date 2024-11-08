import "./Login.css"
import imagen from "../../Utils/utn-icono.png"
import React, { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const usuario = useSelector(state => state.usuario);
    const navegate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    
    function handleSubmit(e){
        e.preventDefault()
        if(username != "Admin" && password != "123")
        {
            alert("error en el login")
        }else{
            try{
                dispatch(login(username , password ))
                navegate("/home")
                
            } catch(e){
                alert("error en el login")
            }
        }
    }

    return (
        <div className="Inicio">
            <div>
                <img className="logo" src={imagen} alt="logo-utn" />
            </div>
            <div className="Conteiner">
                <div className="Login-conteiner" >
                    <form className="Form-Login" onSubmit={(e) =>{
                        handleSubmit(e);
                    }}>
                        <h3>Iniciar Sesión</h3>
                        
                        <TextField id="input-with-sx" label="Ingresa tu Usuario" variant="standard" color="warning"   
                        
                              InputLabelProps={{
                                style: { fontSize: '20px' , color: '#F2F2F2'},
                              }}
                              required
                              sx={{ marginBottom: 2 }}
                              autoComplete="off"
                              plaseholder= "Username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}

                            />
                        <TextField id="outlined-password-input" label="Ingresa tu contraseña" type="password" variant="standard" color="warning"
                            InputLabelProps={{
                            style: { fontSize: '20px' , color: '#F2F2F2'},}}
                            required
                            sx={{ marginBottom: 4 }}
                            autoComplete="off"
                            value={password}
                            plaseholder= "Password"
                            onChange={(e) => setPassword(e.target.value)}

                        />
                        <Button 
                                type="submit"
                                variant="contained"
                                sx={{backgroundColor: '#63acff', '&:hover': {backgroundColor: '#1976D2' }, fontSize:"large"}}>
                                Aceptar
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}