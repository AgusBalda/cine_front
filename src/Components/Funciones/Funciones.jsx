import React, { useEffect, useState} from "react";
import NavBar from "../NavBar/NavBar";
import "./Funciones.css"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { deleteFuncion, getFunciones} from "../../redux/actions";
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";



export default function Funciones () {
    const funciones = useSelector(state => state.funciones)
    const [disable, setDisable] = useState(false)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getFunciones())

    })

    const handleChange = async (id) =>{
      setDisable(true)
      await dispatch(deleteFuncion(id))
      setTimeout(() => {
        setDisable(false)
      }, 1000);
    }

    const columns = [
        { field: 'codFuncion', headerName: 'ID', width: 50 },
        {
          field: 'horaInicio',
          headerName: 'Hora',
          width: 100,
          headerAlign: 'center', align: 'center' 
        },
        {
          field: 'precio',
          headerName: 'Precio',
          width: 100,
          headerAlign: 'center', align: 'center' ,
          renderCell: (params) => {return "$ "+ params.value}
        },
        {
          field: 'subtitulo',
          headerName: 'Subtitulado',
          type: 'number',
          width: 100,
          headerAlign: 'center', align: 'center' ,
          renderCell: (params) => {
              return (
                <Checkbox
                  checked={params.value}
                  disabled={true} 
                />
              );
            },
      
        },
        {
          field: 'dia',
          headerName: 'Dia',
          width: 100,
          headerAlign: 'center', align: 'center' ,
          renderCell: (params) => {
              const dias = [
                'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
              ];
              return dias[params.value];
            },
        },
        {
          field: 'tituloPeli',
          headerName: 'Pelicula',
          width: 150,
          headerAlign: 'center', align: 'center' 
        },
        {
          field: 'tipoFuncion',
          headerName: 'Tipo',
          width: 150,
          headerAlign: 'center', align: 'center' 
        },
        {
          field: 'estado',
          headerName: 'Estado',
          width: 100,
          headerAlign: 'center',
          align: 'center',
          renderCell: (params) => {
            return (
              <Switch
                disabled={disable}
                checked={params.value}
                onChange={(e) => handleChange(params.row.codFuncion)}
              />
            );
          },
        },
        {
          field: 'editar',
          headerName: 'Editar',
          headerAlign: 'center', align: 'center' ,
          width: 110,
          renderCell: (params) => {
              return (
                <>
                  <Link to={"/Funciones/" + params.row.codFuncion}>
                    <Button>
                      Editar
                    </Button>
                  </Link>
              </>)}
        }
      ];

    return (
        <div>
            <div>
                <NavBar/>
            </div>
            <div className="ListPeliculas">
                <Box sx={{ height: 374, width: '52%'}}>
                    <DataGrid
                        
                        rows={funciones}
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
                        getRowId={(funcion) => funcion.codFuncion} 
                    />
                </Box>
            </div>
        </div>
    )
}