import axios from '@app/api';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
import moment from 'moment';
import {
    Form,
    Link,
    Outlet,
    redirectDocument,
    useLoaderData
} from "react-router-dom";


export async function roomLoader({ params }) {
    let { data: room } = await axios.get(`/rooms/${params.id}`);

    const roomScheduleWithMomentDates = room.schedule.map((schedule) => ({
        ...schedule,
        startDateMoment: moment(schedule.startDate),
        endDateMoment: moment(schedule.endDate).add(11, 'hours').add(59, 'minutes'),
    })).sort((a, b) => ( // sorting for available schedules calculations when selecting dates using <DatePickers />
        a.startDateMoment.valueOf() - b.endDateMoment.valueOf()
    ));

    room = {
        ...room,
        schedule: roomScheduleWithMomentDates,
    }

    return { room };
}

export async function bookRoomAction({ request, params }) {
    const formData = await request.formData();

    const {
        startDate,
        endDate,
        roomId,
        userName,
    } = Object.fromEntries(formData);

    const startDateFormatted = moment(startDate).format('YYYY-MM-DD');
    const endDateFormatted = moment(endDate).format('YYYY-MM-DD');

    
    const newSchedulePayload = {
        startDate: startDateFormatted,
        endDate: endDateFormatted,
        roomId,
        userName,
    };

    await axios.post('/schedules', newSchedulePayload);

    return redirectDocument(`/rooms/${params.id}`);
}

function Room() {
    const { room } = useLoaderData();

    return (
        <Grid
            container
            spacing={2}
        >
                <Grid item xs={6}>
                    <Typography variant='h4'>{room.name}</Typography>
                </Grid>

                <Grid
                    item xs={6}
                    sx={{
                        display: 'flex',
                        justifyContent: 'end'
                    }}
                >
                    <Link
                        to="book/add"
                    >
                        <Button
                            variant="contained"
                        >
                            Schedule
                        </Button>
                    </Link>
                </Grid>

                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>User Name</TableCell>
                                    <TableCell>Start Date</TableCell>
                                    <TableCell>End Date</TableCell>
                                    <TableCell>Actions</TableCell>
                                    {/* <TableCell align="right">Created At</TableCell>
                                    <TableCell align="right">Updated At</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {room.schedule.map((schedule) => (
                                    <TableRow
                                        key={schedule.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {schedule.id}
                                        </TableCell>
                                        <TableCell>{schedule.userName}</TableCell>
                                        <TableCell>{schedule.startDateMoment.format('DD/MM/YY')}</TableCell>
                                        <TableCell>{schedule.endDateMoment.format('DD/MM/YY')}</TableCell>
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
                                                action={`book/${schedule.id}/delete`}
                                                method="DELETE"
                                            >
                                                <IconButton aria-label="delete" type="submit">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Form>
                                        </TableCell>
                                        {/* <TableCell align="right">{schedule.createdAt}</TableCell>
                                        <TableCell align="right">{schedule.updatedAt}</TableCell> */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

            <Outlet />
        </Grid>
    );
}

export default Room;
