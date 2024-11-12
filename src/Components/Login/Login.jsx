import "./Login.css"
import imagen from "../../Utils/utn-icono.png"
import React, { useEffect, useState } from "react";
import { TextField} from "@mui/material";
import Button from "@mui/material/Button";
import { useDispatch, useSelector} from "react-redux";
import { login } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const user = useSelector(state => state.usuario)
    const navegate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [log, setLog] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if(Object.keys(user).length === 1){
            setLog(true)
        }
    })

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        try{
            await dispatch(login(username , password ))
            navegate("/home")
        } catch(e){
            setError(true)
        }
        setLoading(false)
    }

    return (
        <div className="Inicio">
            <div>
                <img className="logo" src={imagen} alt="logo-utn" />
            </div>
            <div className="Conteiner">
                
                <div className="Login-conteiner" >
                {
                    log ? <h2>{`Usuario Logiado  User:${user.usuario?.nombre} ${user.usuario?.apellido}`}</h2> :
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
                              error= {error} 
                              helperText={error ? 'Usuario o Contraseña incorrecto' : ''}
                              onChange={(e) => (setUsername(e.target.value), setError(false))}

                            />
                        <TextField id="outlined-password-input" label="Ingresa tu contraseña" type="password" variant="standard" color="warning"
                            InputLabelProps={{
                            style: { fontSize: '20px' , color: '#F2F2F2'},}}
                            required
                            sx={{ marginBottom: 4 }}
                            autoComplete="off"
                            value={password}
                            error= {error} 
                            plaseholder= "Password"
                            onChange={(e) => (setPassword(e.target.value), setError(false))}

                        />
                        <Button 
                                type="submit"
                                variant="contained"
                                disabled={loading}
                                sx={{backgroundColor: '#63acff', '&:hover': {backgroundColor: '#1976D2' }, fontSize:"large"}}>
                                {loading ? 'Validando...' : 'Iniciar sesión'}
                        </Button>
                    </form>
                }
                </div>
            </div>
        </div>
    )
}