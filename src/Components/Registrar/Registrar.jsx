import "./Registrar.css"
import imagen from "../../Utils/utn-icono.png"
import React, { useEffect, useState } from "react";
import { TextField, IconButton, InputAdornment} from "@mui/material";
import Button from "@mui/material/Button";
import { useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { postUsuario } from "../../redux/actions";

export default function Registrar() {
    const user = useSelector(state => state.usuario)
    const navegate = useNavigate();
    const [username, setUsername] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [log, setLog] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error2, setError2] = useState(false);
    const dispatch = useDispatch();


    const handleConstraseña1 = (e) =>{
        setPassword(e.target.value)
    }

    useEffect(() => {
        if(password !== password2){
            setError2(true)
        }
        else{
            setError2(false)
        }
    }, [password, password2])


    async function handleSubmit(e){
        e.preventDefault()
        if(!error2){
            setLoading(true)
            dispatch(postUsuario(username,nombre,apellido,password))
            navegate("/login")
            setLoading(false)
        }
    }

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    return (
        <div className="Inicio">
            <div>
                
            </div>
            <div className="Conteiner">
                
                <div className="Login-conteiner" >
                {
                    log ? <h2>{`Usuario Logiado  User:${user.usuario?.nombre} ${user.usuario?.apellido}`}</h2> :
                    <form className="Form-Login" onSubmit={(e) =>{
                        handleSubmit(e);
                    }}>
                        
                        <TextField id="input-with-sx" label="Email" type="email" variant="standard" 
                        
                              InputLabelProps={{
                                style: { fontSize: '20px' , color: '#F2F2F2'},
                              }}
                              required
                              sx={{ marginBottom: 2 }}
                              autoComplete="off"
                              plaseholder= "Username"
                              value={username}
                              onChange={(e) => (setUsername(e.target.value))}

                            />
                        <TextField id="nombre" label="Nombre" variant="standard"
                            InputLabelProps={{
                            style: { fontSize: '20px' , color: '#F2F2F2'},}}
                            required
                            sx={{ marginBottom: 2 }}
                            autoComplete="off"
                            value={nombre}
                            plaseholder= "nombre"
                            onChange={(e) => (setNombre(e.target.value))}

                        />
                        <TextField id="apellido" label="Apellido" variant="standard"
                            InputLabelProps={{
                            style: { fontSize: '20px' , color: '#F2F2F2'},}}
                            required
                            sx={{ marginBottom: 2 }}
                            autoComplete="off"
                            value={apellido}
                            plaseholder= "apellido"
                            onChange={(e) => (setApellido(e.target.value))}

                        />
                        <TextField id="password" label="Contraseña" type={showPassword ? 'text' : 'password'} variant="standard" 
                            InputLabelProps={{
                            style: { fontSize: '20px' , color: '#F2F2F2'},}}
                            required
                            sx={{ marginBottom: 2}}
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      edge="end"
                                    >
                                      {showPassword ? <Visibility />: <VisibilityOff /> }
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            autoComplete="off"
                            value={password}
                            error= {error2} 
                            plaseholder= "Password"
                            onChange={(e) => handleConstraseña1(e)}

                        />
                        
                        <TextField id="password2" label="Repita Su Contraseña" type={showPassword ? 'text' : 'password'} variant="standard" 
                            InputLabelProps={{
                            style: { fontSize: '20px' , color: '#F2F2F2'},}}
                            required
                            sx={{ 
                                marginBottom: 4, 
                                '& .MuiFormHelperText-root': { fontSize: '14px', fontWeight: "bold"} // Ajusta tamaño y color del helperText
                              }}
                            autoComplete="off"
                            value={password2}
                            error= {error2} 
                            helperText={error2 ? 'Ambas contraseñas deben ser iguales' : ''}
                            plaseholder= "Password2"
                            onChange={(e) => (setPassword2(e.target.value))}
                        />
                        <Button 
                                type="submit"
                                variant="contained"
                                disabled={loading}
                                sx={{backgroundColor: '#63acff', '&:hover': {backgroundColor: '#1976D2' }, fontSize:"large"}}>
                                {loading ? 'Validando...' : 'Registrarse'}
                        </Button>
                    </form>
                }
                </div>
            </div>
        </div>
    )
}