import axios from '@app/api';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { useState } from 'react';
import {
    Form,
    redirect,
    useLoaderData,
    useNavigate,
    useParams,
} from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const isDateFree = (date, roomSchedule) => {
    const isDateInScheduleRange = roomSchedule.some((schedule) => {
        const {
            startDateMoment,
            endDateMoment,
        } = schedule;

        return date.isBetween(startDateMoment, endDateMoment);
    });

    return isDateInScheduleRange;
};

const getMaxDateBasedOnStarDate = (startDateMoment, schedule) => {
    if (!startDateMoment || !schedule) {
        return null;
    }

    for (let i = 0; i < schedule.length; i++) {
        const currentSchedule = schedule[i];

        const isStartDateBetweenAvailableRange = startDateMoment.isBefore(
            currentSchedule.startDate,
        );

        if (isStartDateBetweenAvailableRange) {
            const maxDate = moment(currentSchedule.startDateMoment).subtract(1, 'days');
            return maxDate;
        }
    }

    return null;
};

export async function deleteScheduleAction({ params }) {
    await axios.delete(`/schedules/${params.scheduleId}`);

    return redirect(`/rooms/${params.id}/book`);
}

function ScheduleForm() {
    const navigate = useNavigate();
    const { id: roomId } = useParams();
    const { room } = useLoaderData();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    return (
        <div>
            <Modal
                open
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Form
                        method="post"
                        id="book_room_form"
                        action={`/rooms/${roomId}/book`}
                    >

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6">Add Schedule</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="User Name"
                                    variant="outlined"
                                    fullWidth
                                    name="userName"
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <DatePicker
                                    views={['year', 'month', 'day']}
                                    name="startDate"
                                    id="startDate"
                                    onChange={setStartDate}
                                    shouldDisableDate={(date) => {
                                        return isDateFree(date, room.schedule);
                                    }}
                                    value={startDate}
                                    disablePast
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            required: true,
                                            placeholder: 'Start Date',
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <DatePicker
                                    views={['year', 'month', 'day']}
                                    name="endDate"
                                    value={endDate}
                                    onChange={setEndDate}
                                    disabled={!startDate}
                                    maxDate={getMaxDateBasedOnStarDate(startDate, room.schedule)}
                                    minDate={startDate}
                                    disablePast
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            required: true,
                                            placeholder: 'End Date',
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                    gap: 1,
                                }}
                            >
                                <Button
                                    variant="contained"
                                    type="reset"
                                    color="error"
                                    onClick={() => {
                                        navigate(-1);
                                    }}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    variant="contained"
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </Grid>
                        </Grid>

                        <input
                            type="hidden"
                            name="roomId"
                            value={roomId}
                        />

                    </Form>
                </Box>
            </Modal>
        </div>
    );
}

export default ScheduleForm;
