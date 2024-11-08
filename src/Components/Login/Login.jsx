import "./Login.css"
import imagen from "../../Utils/utn-icono.png"
import React from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

export default function Login() {
    

    return (
        <div className="Inicio">
            <div>
                <img className="logo" src={imagen} alt="logo-utn" />
            </div>
            <div className="Conteiner">
                <div className="Login-conteiner" >
                    <form className="Form-Login" onSubmit={(e) =>{
                        e.preventDefault();
                    }}>
                        <h3>Iniciar Sesión</h3>
                        
                        <TextField id="input-with-sx" label="Ingresa tu Usuario" variant="standard" color="warning"   
                              InputLabelProps={{
                                style: { fontSize: '20px' , color: '#F2F2F2'},
                              }}
                              required
                              sx={{ marginBottom: 2 }}
                              autoComplete="off"
                            />
                        <TextField id="outlined-password-input" label="Ingresa tu contraseña" type="password" variant="standard" color="warning"
                            InputLabelProps={{
                            style: { fontSize: '20px' , color: '#F2F2F2'},}}
                            required
                            sx={{ marginBottom: 4 }}
                            autoComplete="off"
                            
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