import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Alert, Box, Button, IconButton, OutlinedInput, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const ProfileEdit = () => {
    const api = "http://localhost:5555";
    const {authUser} = useContext(AuthContext);
    const [updateName, setUpdateName] = useState(authUser.name);
    const [updateProfile, setUpdateProfile] = useState(authUser.profile);
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const res = await fetch(`${api}/users/${authUser.handle}/profile-edit`);
			const user = await res.json();

			setUpdateName(user.name);
			setUpdateProfile(user.profile);
        })();
    },[authUser.handle])
  return (
    <Box sx={{ my: 3, mx: {lg: 20, md: 5, sm: 5, xs: 3}}}>
        <Box sx={{ mb: 2 }}>
                <IconButton
                    onClick={() => {
                        navigate("/profile");
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>
            </Box>
        <Typography variant='h5' sx={{mb: 3}}>Edit Profile</Typography>
        {
            err && <Alert severity='error' sx={{mb:3}}>{errMsg}</Alert>
        }
        <form onSubmit={(e) => {
            e.preventDefault();
            fetch(`http://localhost:5555/users/${authUser.handle}/update-profile`, {
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({name: updateName, profile: updateProfile})
            })
            .then(res => {
                if(!res.ok) return res.json();
                else navigate("/profile", { state: "Profile Updated successful" });
            })
            .then(json => {
                setErr(true);
                setErrMsg(json.message);
            });
            
        }}>
            <OutlinedInput value={updateName} fullWidth sx={{mb: 2}} onChange={(e) => {
                setUpdateName(e.target.value)
            }}/>
            <OutlinedInput value={authUser.handle} fullWidth sx={{mb: 2}} readOnly/>
            <OutlinedInput value={updateProfile} fullWidth sx={{mb: 2}} onChange={(e) => {
                setUpdateProfile(e.target.value)
            }}/>
            <Button variant='contained' type='submit'>Update</Button>
        </form>
    </Box>
  )
}

export default ProfileEdit