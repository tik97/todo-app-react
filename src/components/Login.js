import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper } from '@mui/material';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        // TODO:
        state: 'state'
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector(state => state.auth);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(credentials)).then(() => {
            navigate('/');
        });
    };

    return (
        <Paper style={{ padding: '16px', maxWidth: '400px', margin: 'auto' }}>
            <Typography variant="h5">Login</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={credentials.username}
                    onChange={handleOnChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={credentials.password}
                    onChange={handleOnChange}
                    margin="normal"
                    required
                />
                <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </form>
        </Paper>
    );
};

export default Login;
