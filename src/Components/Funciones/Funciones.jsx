import React, { useEffect} from "react";
import NavBar from "../NavBar/NavBar";
import "./Funciones.css"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { getFunciones} from "../../redux/actions";
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
  

export default function Funciones () {
    const funciones = useSelector(state => state.funciones)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getFunciones())
    })

    const columns = [
        { field: 'codFuncion', headerName: 'ID', width: 50 },
        {
          field: 'horaInicio',
          headerName: 'Hora',
          width: 150,
          headerAlign: 'center', align: 'center' 
        },
        {
          field: 'precio',
          headerName: 'Precio',
          width: 150,
          headerAlign: 'center', align: 'center' ,
          renderCell: (params) => {return "$ "+ params.value}
        },
        {
          field: 'subtitulo',
          headerName: 'Subtitulado',
          type: 'number',
          width: 110,
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
          width: 110,
          headerAlign: 'center', align: 'center' ,
          renderCell: (params) => {
              const dias = [
                'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
              ];
              return dias[params.value];
            },
        },
        {
          field: 'codPelicula',
          headerName: 'Pelicula',
          width: 110,
          headerAlign: 'center', align: 'center' 
        },
        {
          field: 'idTipoFuncion',
          headerName: 'Tipo',
          width: 110,
          headerAlign: 'center', align: 'center' 
        },
        {
          field: 'estado',
          headerName: 'Estado',
          width: 150,
          headerAlign: 'center',
          align: 'center',
          renderCell: (params) => {
            return (
              <Switch
                checked={params.value}
                onChange={() => e.target.checked }
              />
            );
          },
        },
      ];

    return (
        <div>
            <div>
                <NavBar/>
            </div>
            <div className="ListPeliculas">
                <Box sx={{ height: 400, width: '52%'}}>
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
                        getRowId={(pelicula) => pelicula.codPelicula} 
                    />
                </Box>
            </div>
        </div>
    )
}