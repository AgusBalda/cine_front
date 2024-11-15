import React, { useEffect } from "react";
import "./NavBar.css"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Logout from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useDispatch,useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions";
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';


export default function NavBar(){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorPeliculas, setAnchorPeliculas] = React.useState(null);
    const [anchorAvatar, setAnchorAvatar] = React.useState(null)
    const navegate = useNavigate();
    const user = useSelector(state => state.usuario)
    const openp = Boolean(anchorPeliculas)
    const openf = Boolean(anchorEl)
    const opena = Boolean(anchorAvatar)
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(Object.keys(user).length === 0){
            navegate("/login")
        }
    },[navegate, user])

    const handleClickPelicula = (event) => {
      setAnchorPeliculas(event.currentTarget);
    };
    const handleClickFunciones = (event) => {
        setAnchorEl(event.currentTarget);
      };
    const handleClickAvatar = (event) => {
        setAnchorAvatar(event.currentTarget)
    }
    const handleClose = () => {
      setAnchorEl(null);
      setAnchorPeliculas(null);
      setAnchorAvatar(null);
    };

    function HomeIcon(props) {
        return (
          <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </SvgIcon>
        );
      }

    return(
        <div className="navbar">
            <div className="navbarItems">
                <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-end' }}>
                    <Link to="/home" style={{ textDecoration: 'none', color: '#003bdf'}}>
                        <HomeIcon sx={{ fontSize: 40, cursor: 'pointer', '&:hover': { color: 'darkblue' }  }} />
                    </Link>
                </Stack>
                <div>
                    <Button
                        id="pelicula-button"
                        style={{ fontWeight: "bold", fontSize: "1.25rem" }}
                        aria-controls={openp ? 'peliculas-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openp ? 'true' : undefined}
                        onClick={handleClickPelicula}
                    >
                        Peliculas
                    </Button>
                    <Menu
                        id="peliculas-menu"
                        anchorEl={anchorPeliculas}
                        open={openp}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'pelicula-button',
                        }}
                    >
                        <MenuItem onClick={() =>navegate("/peliculas")}>Lista de Peliculas</MenuItem>
                        <MenuItem onClick={() =>navegate("/crear_pelicula")}>Crear Pelicula</MenuItem>
                    </Menu>
                </div>
                <div>
                    <Button
                        style={{ fontWeight: "bold" , fontSize: "1.25rem"}}
                        id="basic-button"
                        aria-controls={openf ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openf ? 'true' : undefined}
                        onClick={handleClickFunciones}
                    >
                        Funciones
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openf}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() =>navegate("/funciones")}>Lista de Funciones</MenuItem>
                        <MenuItem onClick={() =>navegate("/crear_funcion")}>Crear Funcion</MenuItem>
                    </Menu>
                </div>
                <div>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClickAvatar}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={opena ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={opena ? 'true' : undefined}>
                            <Avatar sx={{ width: 42, height: 42 }}>{user.usuario?.nombre[0]}</Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorAvatar}
                        id="account-menu"
                        open={opena}
                        onClose={handleClose}
                        onClick={handleClose}
                        slotProps={{
                        paper: {
                            elevation: 0,
                            sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                            },
                        },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                        <MenuItem onClick={() => {navegate("/login"); dispatch(logout())}}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    )
}