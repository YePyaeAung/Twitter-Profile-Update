import { Alert, Box, Button, OutlinedInput, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { register } from './apiCalls';

const Register = () => {
    const name = useRef();
    const handle = useRef();
    const profile = useRef();
    const password = useRef();

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();

  return (
    <Box sx={{ my: 3, mx: {lg: 20, md: 5, sm: 5, xs: 3}}}>
        <Typography variant='h5' sx={{my: 3}}>Register</Typography>
        {
            err && <Alert sx={{ mb: 3}} severity='warning'>{errMsg}</Alert>
        }
        <form onSubmit={(e) => {
            e.preventDefault();
            (async () => {
                const user = await register(
                    name.current.value, 
                    handle.current.value, 
                    profile.current.value, 
                    password.current.value
                );
                if(user) {
                    navigate("/login", { state: "Register Successful!"});
                } else {
                    setErr(true);
                    setErrMsg("Register failed, please try again!");
                }
            })();        
        }}>
            <OutlinedInput placeholder='Name' fullWidth sx={{mb: 2}} inputRef={name}/>
            <OutlinedInput placeholder='Handle' fullWidth sx={{mb: 2}} inputRef={handle}/>
            <OutlinedInput placeholder='Profile' fullWidth sx={{mb: 2}} inputRef={profile}/>
            <OutlinedInput type='password' placeholder='Password' fullWidth sx={{mb: 2}} inputRef={password}/>
            <Button variant='contained' type='submit'>Register</Button>
        </form>
    </Box>
  )
}

export default Register