import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PeliculaDetalle.css"
import { clearDetalle, getPelicualDetalle } from "../../redux/actions";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";


export default function PeliculaDetalle () {
    const pelicula = useSelector(state => state.pelicula)
    const dispatch = useDispatch()
    const {id} = useParams()
    useEffect(() => {
        dispatch(getPelicualDetalle(id))
        return () => dispatch(clearDetalle())
    }, [id, dispatch])

    return (
        <div class>
            <div>
                <NavBar/>
            </div>
            <div className="detalle_pelicula">
                <div>
                    <img src={pelicula.portada} alt="Portada" />
                </div>
                <div>
                    <ul>
                        <li>Titulo: {pelicula.titulo}</li>
                        <li>clasificacion: {pelicula.clasificacionEdad}</li>
                        <li>Duracion: {pelicula.duracionMin}/Min</li>
                        <li>Genero: {pelicula.genero}</li>
                        <li>Idioma: {pelicula.idioma}</li>
                        <li>Director: {pelicula.director}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}