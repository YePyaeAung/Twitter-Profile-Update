import { Alert, Box, Button, OutlinedInput, Typography } from '@mui/material'
import React, { useContext, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { login, verify } from './apiCalls';
import { AuthContext } from './AuthProvider';

const Login = () => {
    const handle = useRef();
    const password = useRef();

    const location = useLocation();

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();

    const {setAuth, setAuthUser} = useContext(AuthContext);
  return (
    <Box sx={{ my: 3, mx: {lg: 20, md: 5, sm: 5, xs: 3}}}>
        <Typography variant='h5' sx={{my: 3}}>Login</Typography>
        {
            location.state && <Alert severity='success' sx={{ mb: 3}}>{location.state}</Alert>
        }
        {
            err && <Alert sx={{ mb: 3}} severity='warning'>{errMsg}</Alert>
        }
        <form onSubmit={(e) => {
            e.preventDefault();
            (async () => {
                const token = await login(handle.current.value, password.current.value)

                if(token) {
                    setAuth(true);

                    const user = await verify();
                    setAuthUser(user);

                    navigate("/");
                } else {
                    setErr(true);
                    setErrMsg("Handle or Password incorrect");
                }
            })();
        }}>
            <OutlinedInput placeholder='Handle' fullWidth sx={{mb: 2}} inputRef={handle}/>
            <OutlinedInput type='password' placeholder='Password' fullWidth sx={{mb: 2}} inputRef={password}/>
            <Button variant='contained' type='submit'>Login</Button>
        </form>
    </Box>
  )
}

export default Login