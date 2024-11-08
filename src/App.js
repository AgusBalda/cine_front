import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import React from 'react';
import Inicio from './Components/Inicio/Inicio';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import PeliculaDetalle from './Components/PeliculaDetalle/PeliculaDetalle';
import CrearPelicula from './Components/CrearPelicula/CrearPelicula';
import Funciones from './Components/Funciones/Funciones';
import CrearFuncion from './Components/CrearFuncion/CrearFuncion';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" Component={Inicio}/>
          <Route exact path="/home" Component={Home}/>
          <Route exact path="/login" Component={Login}/>
          <Route exact path="/pelicula/:id" Component={PeliculaDetalle}/>
          <Route exact path="/pelicula/crear" Component={CrearPelicula}/>
          <Route exact path="/funcion" Component={Funciones}/>
          <Route exact path="/funcion/crear" Component={CrearFuncion}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
