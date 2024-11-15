import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import { clearDetalle, getPeliculas, getPromociones, getSalas, getTipoFuncion, postFuncion } from "../../redux/actions";
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import {FormHelperText } from '@mui/material';
import dayjs from 'dayjs';
import { MenuItem, FormControlLabel, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { format } from "date-fns";
import Switch from '@mui/material/Switch';
import Swal from 'sweetalert2';

export default function CrearFuncion() {
    const salas = useSelector(state => state.salas)
    const peliculas = useSelector(state => state.peliculas)
    const promociones = useSelector(state => state.promociones)
    const tipos = useSelector(state => state.tiposFuncion)
    const [selectedTime, setSelectedTime] = useState(dayjs());
    const [selectedTimeF, setSelectedTimeF] = useState(format(dayjs(), "HH:mm:ss"));
    const [precio, setPrecio] = useState(0);
    const [subtitulos, setSubtitulos] = useState(false);
    const [dia, setDia] = useState(1);
    const [idSala, setIdSala] = useState("");
    const [idPelicula, setIdPelicula] = useState("");
    const [idPromocion, setIdPromocion] = useState(0);
    const [idTipo, setIdTipo] = useState("");
    const dispatch = useDispatch()
    const [estado, setEstado] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error1, setError1] = useState(false)
    const [error2, setError2] = useState(false)
    const [error3, setError3] = useState(false)
    const [error4, setError4] = useState(false)
    const navegate = useNavigate();


    useEffect(() => {
        dispatch(getSalas())
        dispatch(getPeliculas())
        dispatch(getPromociones())
        dispatch(getTipoFuncion())
        
        return () => dispatch(clearDetalle())
    }, [dispatch])

    const handleTimeChange = (newValue) => {
        setError1(false)
        if(newValue && !isNaN(newValue.$H)){
            setSelectedTime(newValue);
            setSelectedTimeF(format(newValue, "HH:mm:ss"))
        }
        else{
            setSelectedTimeF("")
        }
      ;}

    console.log(selectedTimeF)
    
    const handleChange = (event) => {
        const newValue = event.target.value;
        if (/^\d*$/.test(newValue)) {
          setPrecio(newValue);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        if(selectedTimeF === ""){
            setError1(true)
        }
        else if(idSala === ""){
            setError2(true)
        }
        else if(idPelicula === ""){
            setError3(true)
        }
        else if(idTipo === ""){
            setError4(true)
        }
        else{
            setLoading(true)
            await dispatch(postFuncion(selectedTimeF, precio, subtitulos, dia, idPelicula, idSala,idPromocion,idTipo, estado))
            Swal.fire({
              icon: "success",
              title: "Funcion Creada Correctamente"
            })
            setTimeout(() => {
              navegate("/funciones")
            }, 1000);
            setLoading(false)
        }
    }

    return(
        <div>
            <div>
                <NavBar/>
            </div>
            <form className="Login-conteiner" onSubmit={(e) =>{handleSubmit(e);}}>
                <FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                            label="Selecciona la hora"
                            value={selectedTime}
                            onChange={handleTimeChange}
                            slotProps={{ textField: { variant: 'outlined' } }} // Configura el TextField de entrada
                        />
                    </LocalizationProvider>
                    {error1 && (
                            <FormHelperText style={{ color: 'red' , fontWeight: 'bold'}}>
                              Por favor, seleccione un horario valido
                            </FormHelperText>
                          )}
                </FormControl>
                <TextField
                    id="Precio"
                    label="Precio"
                    required
                    variant="outlined"
                    value={precio}
                    onChange={handleChange}
                />
                <FormControl>
                  <InputLabel id="subtitulado">Subtitulos</InputLabel>
                  <Select
                      id="Subtitulado"
                      value={subtitulos}
                      label="Subtitulos"
                      onChange={(e) => setSubtitulos(e.target.value)}
                      >
                      <MenuItem value={true}>Subtitulado</MenuItem>
                      <MenuItem value={false}>No Subtitulado</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel id="Dia">Dia</InputLabel>
                  <Select
                      id="Dia"
                      value={dia}
                      label="Dia"
                      onChange={(e) => setDia(e.target.value)}
                      >
                      <MenuItem value={1}>Lunes</MenuItem>
                      <MenuItem value={2}>Martes</MenuItem>
                      <MenuItem value={3}>Miercoles</MenuItem>
                      <MenuItem value={4}>Jueves</MenuItem>
                      <MenuItem value={5}>Viernes</MenuItem>
                      <MenuItem value={6}>Sabado</MenuItem>
                      <MenuItem value={0}>Domingo</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel id="Sala">Sala</InputLabel>
                  <Select
                      id="Sala"
                      value={idSala}
                      label="Sala"
                      onChange={(e) => (setIdSala(e.target.value), setError2(false))}
                      >
                      {
                        salas ?
                        salas.map(s => {return(<MenuItem key={s.idSala} value={s.idSala}>Sala: {s.nroSala}</MenuItem>)}) : null
                      }
                  </Select>
                  {error2 && (
                            <FormHelperText style={{ color: 'red' , fontWeight: 'bold'}}>
                              Por favor, seleccione una sala
                            </FormHelperText>
                          )}
                </FormControl>
                <FormControl>
                  <InputLabel id="Pelicula">Pelicula</InputLabel>
                  <Select
                      id="Pelicula"
                      value={idPelicula}
                      label="Pelicula"
                      onChange={(e) => (setIdPelicula(e.target.value), setError3(false))}
                      >
                      {
                        peliculas ?
                        peliculas.map(p => {return(<MenuItem key={p.codPelicula} value={p.codPelicula}>{p.titulo}</MenuItem>)}) : null
                      }
                  </Select>
                  {error3 && (
                            <FormHelperText style={{ color: 'red' , fontWeight: 'bold'}}>
                              Por favor, seleccione una pelicula
                            </FormHelperText>
                          )}
                </FormControl>
                <FormControl>
                  <InputLabel id="Promocion">Promocion</InputLabel>
                  <Select
                      id="Promocion"
                      value={idPromocion}
                      label="Promocion"
                      onChange={(e) => (setIdPromocion(e.target.value))}
                      >
                        
                      {
                        promociones ?
                        promociones.map(p => {return(<MenuItem key={p.codPromocion} value={p.codPromocion}>%{p.descPorcentaje}</MenuItem>)}) : null
                      }
                      <MenuItem key={5234} value={0}>Sin Promocion</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel id="Tipo">Tipo Funcion</InputLabel>
                  <Select
                      id="Tipo"
                      value={idTipo}
                      label="Tipo"
                      onChange={(e) => (setIdTipo(e.target.value), setError4(false))}
                      >
                        
                      {
                        tipos ?
                        tipos.map(t => {return(<MenuItem key={t.idTipoFuncion} value={t.idTipoFuncion}>{t.tipo}</MenuItem>)}) : null
                      }
                  </Select>
                  {error4 && (
                            <FormHelperText style={{ color: 'red' , fontWeight: 'bold'}}>
                              Por favor, seleccione el tipo de funcion
                            </FormHelperText>
                          )}
                </FormControl>
                <Box       
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <FormControlLabel 
                        label="Estado"
                        sx={{
                            color: "black",
                            fontWeight: "bold" 
                          }} 
                          control={                    <Switch
                            checked={estado}
                            onChange={(e) => setEstado(!estado) }
                        />}                  
                        />
                </Box>

                <Button 
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{backgroundColor: '#63acff', '&:hover': {backgroundColor: '#1976D2' }, fontSize:"large"}}>
                    {loading ? 'Validando...' : 'Crear Funcion'}
                  </Button>
            </form>
        </div>
    )
}