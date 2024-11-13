import React, { useEffect} from "react";
import NavBar from "../NavBar/NavBar";
import "./Peliculas.css"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPeliculas } from "../../redux/actions";

const columns = [
  { field: 'codPelicula', headerName: 'ID', width: 90 },
  {
    field: 'titulo',
    headerName: 'Titulo',
    width: 150,
    headerAlign: 'center', align: 'center' 
  },
  {
    field: 'fechaEstreno',
    headerName: 'Fecha Estreno',
    width: 150,
    headerAlign: 'center', align: 'center' 
  },
  {
    field: 'duracionMin',
    headerName: 'Duracion',
    type: 'number',
    width: 110,
    headerAlign: 'center', align: 'center' 
  },
  {
    field: 'genero',
    headerName: 'Genero',
    width: 110,
    headerAlign: 'center', align: 'center' 
  },
  {
    field: 'clasificacionEdad',
    headerName: 'Clasificacion',
    width: 110,
    headerAlign: 'center', align: 'center' 
  },
  {
    field: 'idioma',
    headerName: 'Idioma',
    width: 110,
    headerAlign: 'center', align: 'center' 
  },
  {
    field: 'detalle',
    headerName: 'Detalle',
    headerAlign: 'center', align: 'center' ,
    width: 110,
    renderCell: (params) => {
        return (
          <>
            <Link to={"/Pelicula/" + params.row.codPelicula}>
              <button>
                Detalles
              </button>
            </Link>
        </>)}
  },
];
  

export default function  Peliculas() {
    const peliculas = useSelector(state => state.peliculas)
    const dispatch = useDispatch()
    console.log(peliculas)
    useEffect(() => {
        dispatch(getPeliculas())
    })

    return(
        <div>
            <div>
                <NavBar/>
            </div>
            <div className="ListPeliculas">
                <Box sx={{ height: 400, width: '52%'}}>
                    <DataGrid
                        
                        rows={peliculas}
                        columns={columns}
                        initialState={{
                        pagination: {
                            paginationModel: {
                            pageSize: 5,
                            },
                        },
                        }}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                        getRowId={(pelicula) => pelicula.codPelicula} 
                    />
                </Box>
            </div>
        </div>
    )
}