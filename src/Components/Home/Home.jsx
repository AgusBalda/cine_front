import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Home.css"
import NavBar from "../NavBar/NavBar";

export default function Home() {
    const user = useSelector(state => state.usuario)
    const navegate = useNavigate();
    
    useEffect(() => {
        if(Object.keys(user).length === 0){
            navegate("/login")
        }
    },[navegate, user])
    return (
        <div className="Home">
            <div>
                <NavBar/>
            </div>
            <div className="TituloHome">
                <h1>Bienvenido</h1>
                <h2>{`${user.usuario?.nombre} ${user.usuario?.apellido}`}</h2>
                <h3>Aplicacion Web Cine</h3>
            </div>
        </div>
    )
}