import { useContext, useEffect, useState } from "react";
import MainDrawer from "./MainDrawer";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import { AuthContext } from "./AuthProvider";
import { verify } from "./apiCalls";
import Profile from "./Profile";
import ProfileEdit from "./ProfileEdit";

const Home = () => {
	const {auth} = useContext(AuthContext);
	return (
		<div>
			{
				auth ? (
					"Login User"
				) : (
					"Guest User"
					)
			}
		</div>
	)
};

export default function App() {
	const {setAuth, setAuthUser} = useContext(AuthContext);

	useEffect(() => {
		(async () => {
			const user = await verify();
			if(user) {
				setAuth(true);
				setAuthUser(user)
			}
		})();
	}, [setAuth, setAuthUser])

	const [drawerState, setDrawerState] = useState(false);

	const toggleDrawer = open => event => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setDrawerState(open);
	};

	return (
		<div>
			<Header toggleDrawer={toggleDrawer} />
			<MainDrawer drawerState={drawerState} toggleDrawer={toggleDrawer} />

			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/login" element={<Login/>}/>
				<Route path="/register" element={<Register/>}/>
				<Route path="/profile" element={<Profile/>}/>
				<Route path="/:handle/profile-edit" element={<ProfileEdit/>}/>
			</Routes>
		</div>
	);
}
