import React, { useEffect, useState} from "react";
import NavBar from "../NavBar/NavBar";
import "./Peliculas.css"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePelicula, getPeliculas } from "../../redux/actions";
import { Alert, Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function  Peliculas() {
    const peliculas = useSelector(state => state.peliculas)
    const [open, setOpen] = React.useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const [peliculaDel, setPeliculaDel] = useState("");
    const dispatch = useDispatch()
    console.log(peliculas)
    useEffect(() => {
        dispatch(getPeliculas())
    })

    const handleDelete = (id, titulo) => {
      setDeleteId(id)
      setPeliculaDel(titulo)
      setOpen(true)
    };

    const handleConfirm = () => {
      dispatch(deletePelicula(deleteId))
      setOpen(false)
    }

    const handleCancel = () => {
      setOpen(false)
    }

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
        width: 90,
        headerAlign: 'center', align: 'center' 
      },
      {
        field: 'genero',
        headerName: 'Genero',
        width: 100,
        headerAlign: 'center', align: 'center' 
      },
      {
        field: 'clasificacionEdad',
        headerName: 'Clasificacion',
        width: 80,
        headerAlign: 'center', align: 'center' 
      },
      {
        field: 'idioma',
        headerName: 'Idioma',
        width: 100,
        headerAlign: 'center', align: 'center' 
      },
      {
        field: 'acciones',
        headerName: 'Acciones',
        headerAlign: 'center', align: 'center' ,
        width: 330,
        renderCell: (params) => (
          <Box display="flex" gap={1}>
          <Link to={"/Pelicula/" + params.row.codPelicula}>
            <Button
              variant="contained"
              color="secondary"
              >
                Detalles
            </Button>
          </Link>
          <Link to={"/editar_pelicula/" + params.row.codPelicula}>
            <Button
                variant="contained"
                color="secondary"
              >
              Editar
            </Button>
          </Link>
          <Link>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDelete(params.row.codPelicula, params.row.titulo)}
            >
              Eliminar
            </Button>
          </Link>
          </Box>
        ),
      },
    ];
      


    return(
        <div>
            <div>
                <NavBar/>
            </div>
            <div className="ListPeliculas">
                <Box sx={{ height: 374, width: '57%'}}>
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
            <Dialog
              open={open}
              onClose={handleCancel}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Deasea elimnar " + peliculaDel}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Estás a punto de eliminar la película de forma permanente. ¿Estás seguro de que deseas continuar?
                Asegúrate de que la película no esté programada en ninguna función; de lo contrario, no será posible eliminarla. 
              </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancel}>Cancelar</Button>
                <Button onClick={handleConfirm} autoFocus>
                  Aceptar
                </Button>
              </DialogActions>
            </Dialog>
        </div>
    )
}