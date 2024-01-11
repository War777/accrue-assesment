
import axios from '@app/api';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {
    setAuthTokens
} from 'axios-jwt';
import {
    Form,
    redirect
} from "react-router-dom";

export const loginAction = async ({ request }) => {
    const formData = await request.formData();

    const {
        username,
        password,
    } = Object.fromEntries(formData);
    
    try {
        const response = await axios.post('/auth/login', {
            username,
            password,
        });

        if (response.status === 200) {
            setAuthTokens({
                accessToken: response.data.access_token,
                refreshToken: response.data.refresh_token
            });
        
            return redirect('/rooms');
        } else {
            return redirect('/');
        }
    } catch (error) {
        if (error.response.status === 401) {
            alert('Invalid User Name or Password');
        }

        return null;
    }
}

function LoginForm() {
    return (
        <Container>
            <Box
                sx={{
                    flexGrow: 1,
                    minHeight: '100vh',
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center'
                }}
            >
                <Form
                    style={{
                        minHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    method="POST"
                >
                    <Grid
                        container
                        spacing={2}
                        sx={{ width: 500 }}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            <TextField
                                id="outlined-basic"
                                label="User Name"
                                variant="outlined"
                                fullWidth
                                name="username"
                                required
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                        >
                            <TextField
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                                fullWidth
                                name="password"
                                type="password"
                                required
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: 'flex',
                                justifyContent: 'end',
                            }}
                        >
                            <Button
                                variant="contained"
                                type="submit"
                            >
                                Sign In
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            </Box>
        </Container>
    );
}

export default LoginForm;
