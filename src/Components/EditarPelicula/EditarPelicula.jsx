import React, { useEffect, useState } from "react";
import './EditarPelicula.css';
import TextField from '@mui/material/TextField';
import NavBar from "../NavBar/NavBar";
import {FormHelperText } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers";
import { format} from 'date-fns';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from "react-redux";
import { getDirectores, getGeneros, getIdiomas, getClasificacion, postPelicula, getPelicualDetalle, putPelicula } from "../../redux/actions";
import { useNavigate, useParams } from "react-router-dom";

export default function EditarPelicula() {
      const pelicula = useSelector(state => state.pelicula)
      const generos = useSelector(state => state.generos)
      const clasificacion = useSelector(state => state.clasificaciones)
      const directores = useSelector(state => state.directores)
      const idiomas = useSelector(state => state.idiomas)
      const dispatch = useDispatch()
      const {id} = useParams()
      const [selectedDate, setSelectDate] = useState(null)
      const [selectDateF, setSelectDateF] = useState(null)
      const [titulo, setTitulo] = useState("")
      const [url, setUrl] = useState("");
      const [duracion, setDuracion] = useState("")
      const [clas, setClas] = useState("")
      const [genero, setGenero] = useState("")
      const [loading, setLoading] = useState(false);
      const [idioma, setIdioma] = useState("")
      const [director, setDirector] = useState("")
      const navegate = useNavigate();
      const [error1, setError1] = useState(false)
      const [error2, setError2] = useState(false)
      const [error3, setError3] = useState(false)
      const [error4, setError4] = useState(false)
      const [error5, setError5] = useState(false)

      useEffect(() => {
        dispatch(getPelicualDetalle(id))
        dispatch(getIdiomas())
        dispatch(getDirectores())
        dispatch(getGeneros())
        dispatch(getClasificacion())
      }, [])
      console.log(pelicula)
      
      useEffect(() => {
        if(pelicula !== ""){
            setSelectDate(dayjs(pelicula.fechaEstreno))
            setSelectDateF(format(dayjs(pelicula.fechaEstreno), 'yyyy-MM-dd'))
            setTitulo(pelicula.titulo)
            setDuracion(pelicula.duracionMin)
            setUrl(pelicula.portada)
            setClas(pelicula.idClasificacionEdad)
            setGenero(pelicula.idGenero)
            setIdioma(pelicula.idIdioma)
            setDirector(pelicula.idDirector)
        }

      }, [pelicula])

      const handleDateChange = (newDate) => {
        setError1(false)
        if (newDate && !isNaN(newDate.$d.getDate())) {
            setSelectDate(newDate)
            const formattedDate = format(newDate, 'yyyy-MM-dd');
            setSelectDateF(formattedDate);
          } else {
            setSelectDateF(null);
            setSelectDate(null)
          }
      };

      const handleChange = (event) => {
        const newValue = event.target.value;
        if (/^\d*$/.test(newValue)) { // Solo permite dígitos
          setDuracion(newValue);
        }
      };


      const  handleSubmit = async (e) =>{
          e.preventDefault()
          setLoading(true)
          if(selectDateF === null){
            setError1(true)
          }
          else if(genero === ""){
            setError2(true)
          }
          else if(clas === ""){
            setError3(true)
          }
          else if(idioma === ""){
            setError4(true)
          }
          else if(director === ""){
            setError5(true)
          }
          else{
            try{
              setLoading(true)
              await dispatch(putPelicula(selectDateF, titulo, duracion, url, genero, clas, idioma, director, id))
              navegate("/peliculas")
              setLoading(false)
            }catch(e){
              alert(e)
            }
            
          }
          setLoading(false)
      }

      return (
        <div>
            <div>
                <NavBar/>
            </div>
            <form className="Login-conteiner" onSubmit={(e) =>{handleSubmit(e);}}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DemoContainer components={['DatePicker']} >
                          <DatePicker label="Fecha Estreno"  
                              format="DD-MM-YYYY"
                              value={selectedDate}
                              onChange={handleDateChange}
                              sx={{width: '100%', height: '60px'}}
                          />
                      </DemoContainer>
                      {error1 && (
                            <FormHelperText style={{ color: 'red' , fontWeight: 'bold'}}>
                              Por favor, seleccione una fecha
                            </FormHelperText>
                          )}
                  </LocalizationProvider>
                </FormControl>
                <TextField id="Titulo" label="Titulo" variant="outlined" required value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                <TextField
                    id="Duracion"
                    label="Duracion"
                    required
                    variant="outlined"
                    value={duracion}
                    onChange={handleChange}
                />
                <TextField id="url" label="Portada" type="url" variant="outlined" required value={url} onChange={(e) => setUrl(e.target.value)} />
                <FormControl>
                  <InputLabel id="Genero">Genero</InputLabel>
                  <Select
                      id="Genero"
                      value={genero}
                      label="Genero"
                      onChange={(e) => (setGenero(e.target.value), setError2(false))}
                      >
                      {
                        generos ?
                        generos.map(g => {return(<MenuItem key={g.idGenero} value={g.idGenero}>{g.genero1}</MenuItem>)}) : null
                      }
                  </Select>
                  {error2 && (
                            <FormHelperText style={{ color: 'red' , fontWeight: 'bold'}}>
                              Por favor, seleccione un genero
                            </FormHelperText>
                    )}
                </FormControl>
                <FormControl>
                  <InputLabel  id="clas">Clasificacion</InputLabel>
                  <Select
                      id="clas"
                      value={clas}
                      label="CLasificacion"
                      onChange={(e) => (setClas(e.target.value), setError3(false))}
                      >
                      {
                        clasificacion ?
                        clasificacion.map(c => {return(<MenuItem key={c.idClasificacion} value={c.idClasificacion}>{c.clasificacion}</MenuItem>)}) : null
                      }
                  </Select>
                  {error3 && (
                            <FormHelperText style={{ color: 'red' , fontWeight: 'bold'}}>
                              Por favor, seleccione un CLasificacion
                            </FormHelperText>
                    )}
                </FormControl>
                <FormControl>
                  <InputLabel id="idioma">Idioma</InputLabel>
                  <Select
                      id="idioma"
                      value={idioma}
                      label="Idioma"
                      onChange={(e) => (setIdioma(e.target.value), setError4(false))}
                      >
                      {
                        idiomas ?
                        idiomas.map(i => {return(<MenuItem key={i.idIdioma} value={i.idIdioma}>{i.idioma1}</MenuItem>)}) : null
                      }
                  </Select>
                  {error4 && (
                            <FormHelperText style={{ color: 'red' , fontWeight: 'bold'}}>
                              Por favor, seleccione un Idioma
                            </FormHelperText>
                    )}
                </FormControl>
                <FormControl>
                  <InputLabel id="Director">Director</InputLabel>
                  <Select
                      id="Director"
                      value={director}
                      label="Director"
                      onChange={(e) => (setDirector(e.target.value), setError5())}
                      >
                      {
                        directores ?
                        directores.map(d => {return(<MenuItem key={d.idDirector}  value={d.idDirector}>{d.nombre + " " + d.apellido}</MenuItem> )}) : null
                      }
                  </Select>
                  {error5 && (
                            <FormHelperText style={{ color: 'red' , fontWeight: 'bold'}}>
                              Por favor, seleccione un Director
                            </FormHelperText>
                    )}
                </FormControl>
                <Button 
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{backgroundColor: '#63acff', '&:hover': {backgroundColor: '#1976D2' }, fontSize:"large"}}>
                    {loading ? 'Validando...' : 'Editar Pelicula'}
                  </Button>
            </form>
        </div>
      );
}