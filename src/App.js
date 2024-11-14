import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import React from 'react';
import Inicio from './Components/Inicio/Inicio';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import PeliculaDetalle from './Components/PeliculaDetalle/PeliculaDetalle';
import CrearPelicula from './Components/CrearPelicula/CrearPelicula';
import Funciones from './Components/Funciones/Funciones';
import EditarFuncion from './Components/EditarFuncion/EditarFuncion';
import Peliculas from './Components/Peliculas/Peliculas';
import CrearFuncion from './Components/CrearFuncion/CrearFuncion';
import EditarPelicula from './Components/EditarPelicula/EditarPelicula';
import Registrar from './Components/Registrar/Registrar';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" Component={Inicio}/>
          <Route exact path="/home" Component={Home}/>
          <Route exact path="/login" Component={Login}/>
          <Route exact path="/peliculas" Component={Peliculas} />
          <Route exact path="/pelicula/:id" Component={PeliculaDetalle}/>
          <Route exact path="/crear_pelicula" Component={CrearPelicula}/>
          <Route exact path="/editar_pelicula/:id" Component={EditarPelicula}/>
          <Route exact path="/registrarse" Component={Registrar}/>
          <Route exact path="/funciones" Component={Funciones}/>
          <Route exact path="/funciones/:id" Component={EditarFuncion}/>
          <Route exact path="/crear_funcion" Component={CrearFuncion}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
