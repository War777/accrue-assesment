import axios from '@app/api';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {
    Form,
    redirect,
    useLoaderData,
    useNavigate
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

export async function roomAction({ request }) {
    const formData = await request.formData();

    const {
        capacity,
        name,
        mode,
        id,
    } = Object.fromEntries(formData);

    const axiosRequest = mode === 'create' ? axios.post : axios.put;

    const endpoint = mode === 'create' ? '/rooms' : `/rooms/${id}`;

    await axiosRequest(endpoint, {
        id,
        capacity,
        name,
    });

    // throw new Response("", {
    //     status: 404,
    //     statusText: "Not Found",
    // });

    return redirect(`/rooms`);
}

export async function deleteRoomAction({ params }) {
    await axios.delete(`/rooms/${params.id}`);

    return redirect(`/rooms`);
}

function AddRoomForm() {
    const navigate = useNavigate();

    const { room } = useLoaderData() ?? {};

    const isEditing = !!room;

    return (
        <div>
            <Modal
                open
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={style}
                >
                    <Form method="post" id="room_form">
                        <input type="hidden" name="mode" value={isEditing ? 'edit' : 'create' }/>
                        <input type="hidden" name="id" value={room?.id}/>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6">
                                    {`${isEditing ? 'Edit' : 'Add'} Room`}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    name="name"
                                    defaultValue={room?.name}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Capacity"
                                    variant="outlined"
                                    name="capacity"
                                    fullWidth
                                    defaultValue={room?.capacity}
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
                                    type="button"
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
                    </Form>
                </Box>
            </Modal>
        </div>
    );
}

export default AddRoomForm;
