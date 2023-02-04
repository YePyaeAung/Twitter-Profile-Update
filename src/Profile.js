import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const Profile = () => {
    const {authUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState(authUser.name);
    const [profile, setProfile] = useState(authUser.name);
    const api = "http://localhost:5555";

    useEffect(() => {
        (async () => {
            const res = await fetch(`${api}/users/${authUser.handle}/profile-edit`);
			const user = await res.json();

			setName(user.name);
			setProfile(user.profile);
        })();
    },[authUser])
  return (
    <div>
        <Box sx={{height: 200, bgcolor: "grey"}}></Box>
        <Box sx={{ my: 3, mx: {lg: 20, md: 5, sm: 5, xs: 3}}}>
            {/* <Typography variant='h5' sx={{mb:3}}>
                User Profile
            </Typography>
            <List>
                <ListItem>
                    <ListItemText>Name : {authUser.name}</ListItemText>
                    <ListItemButton onClick={() => {
                        navigate("/profile-edit")
                    }}>
                        <ListItemIcon>
                            <EditIcon/>
                        </ListItemIcon>
                            <ListItemText primary="Edit"/>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemText>Handle : {authUser.handle}</ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>Profile : {authUser.profile}</ListItemText>
                </ListItem>
            </List> */}
            <Card fullWidth>
                <CardContent>
                    <Button size="small" sx={{ ml: 125 }} onClick={() => {
                        navigate(`/${authUser.handle}/profile-edit`);
                    }}>Edit</Button>
                    <Typography gutterBottom variant="h5" component="div">
                        {/* {authUser.name} */}
                        {name}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: -1, mb: 5 }} color="text.secondary">
                        @{authUser.handle}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {/* Profile : {authUser.profile} */}
                        Profile : {profile}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    </div>
  )
}

export default Profile