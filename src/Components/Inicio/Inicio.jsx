import "./Inicio.css"
import { Link } from "react-router-dom";
import React from "react";
import imagen from "../../Utils/utn-icono.png"

export default function Inicio() {
    return (
        <div className="Inicio">
            <div>
                <img className="logo" src={imagen} alt="logo-utn" />
            </div>
            <div className="Titulo">
                <h1>PROGRAMACIÓN II</h1>
                <h2>Trabajo Práctico Integrador</h2>
                <h3>Grupo-8 | 1W1</h3>
            </div>
            <div className="bt-login">
                <Link className="bt-login-self" to={"/login"}>Iniciar</Link>
            </div>
            <div className="Integrantes">
                <p>Integrantes: </p>
                <ul>
                    <li>Pablo Aciar-114148</li>
                    <li>Joaquin Almada-412180</li>
                    <li>Lorenzo Araujo-404909</li>
                    <li>Baigorria Damián-412085</li>
                    <li>Agustin Baldassari-412082</li>
                    <li>Joaquin Cortez-412142</li>
                </ul>
            </div>
        </div>
    )
}