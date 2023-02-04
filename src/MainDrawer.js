import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
	Login as LoginIcon,
	Logout as LogoutIcon,
	Person as PersonIcon,
	PersonAdd as PersonAddIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { Typography } from "@mui/material";

export default function MainDrawer({drawerState, toggleDrawer}) {
	const navigate = useNavigate();
	const {auth, setAuth, authUser, setAuthUser} = React.useContext(AuthContext);
	const list = () => (
		<Box
			sx={{ width: 250 }}
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}>
				<Box sx={{height: 150, bgcolor: 'grey'}}></Box>
				{
					auth && (
						<Typography>
							{authUser.name} @ {authUser.handle}
						</Typography>
					)
				}
				{
					auth ? (
					<List>
						<ListItem disablePadding>
							<ListItemButton onClick={() => {
								navigate("/profile")
							}}>
								<ListItemIcon>
									<PersonIcon />
								</ListItemIcon>
								<ListItemText primary="Profile" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton onClick={() => {
								navigate("/")
								setAuth(false)
								setAuthUser({})
								localStorage.removeItem("token")
							}}>
								<ListItemIcon>
									<LogoutIcon />
								</ListItemIcon>
								<ListItemText primary="Logout" />
							</ListItemButton>
						</ListItem>
					</List>
					)
					:
					(
						<List>
							<ListItem disablePadding>
								<ListItemButton onClick={()=> {
									navigate("/login");
								}}>
									<ListItemIcon>
										<LoginIcon />
									</ListItemIcon>
									<ListItemText primary="Login" />
								</ListItemButton>
							</ListItem>
							<ListItem disablePadding>
								<ListItemButton onClick={() => {
									navigate("/register")
								}}>
									<ListItemIcon>
										<PersonAddIcon />
									</ListItemIcon>
									<ListItemText primary="Register" />
								</ListItemButton>
							</ListItem>
						</List>
					)
				}
		</Box>
	);

	return (
		<div>
			<React.Fragment>
				<Drawer
					anchor="left"
					open={drawerState}
					onClose={toggleDrawer(false)}
				>
					{list()}
				</Drawer>
			</React.Fragment>
		</div>
	);
}
