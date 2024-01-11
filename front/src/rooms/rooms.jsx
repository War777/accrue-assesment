import axios from '@app/api';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { getAccessToken } from 'axios-jwt';
import { useEffect } from 'react';
import {
    Form,
    Link,
    Outlet,
    redirect,
    useLoaderData,
    useNavigate,
} from "react-router-dom";

export async function roomsLoader() {
    try {
        const { data: rooms } = await axios.get('/rooms');

        return { rooms };
    } catch (error) {
        if (error.response.status === 401) {
            alert('Unauthorized');
        }

        return redirect('/');
    }

}

function Rooms() {
    const navigate = useNavigate();

    const { rooms } = useLoaderData();

    
    useEffect(() => {
        const validateSession = async () => {
            const isLoggedIn = !!await getAccessToken()
    
            if (!isLoggedIn) {
                navigate('/')
            }
        };

        validateSession();
    }, [navigate]);

    return (
        <Box sx={{ flexGrow: 1, margin: 5, }}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant='h4'>Rooms</Typography>
                        </Grid>

                        <Grid
                            item
                            xs={6}
                            sx={{
                                display: 'flex',
                                justifyContent: 'end'
                            }}    
                        >
                            <Link to="add">
                                <Button variant="contained">
                                    <Typography variant="body1">
                                        New
                                    </Typography>
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Capacity</TableCell>
                                        <TableCell>Schedule</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rooms.map((room) => (
                                        
                                        <TableRow
                                            key={room.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {room.id}
                                            </TableCell>
                                            <TableCell>{room.name}</TableCell>
                                            <TableCell align="right">{room.capacity}</TableCell>
                                            <TableCell align="center">
                                                <Link
                                                    to={`${room.id}`}
                                                >
                                                    Schedule
                                                </Link>
                                            </TableCell>

                                            <TableCell style={{ display: 'flex', gap: '10px'}}>
                                                <Link
                                                    to={`${room.id}/edit`}
                                                    state={{
                                                        room,
                                                    }}
                                                >
                                                    <IconButton aria-label="edit">
                                                        <EditIcon />
                                                    </IconButton>
                                                </Link>

                                                <Form
                                                    action={`${room.id}/delete`}
                                                    method="DELETE"
                                                >
                                                    <IconButton aria-label="delete" type="submit">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Form>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Outlet />
                </Grid>

            </Grid>
        </Box>
    );
}

export default Rooms;