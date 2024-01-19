import React from 'react';
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './TopNav.css';
import axios from 'axios';

const logo = 'public/imgs/ww_logo2.png';
const loggedIn = localStorage.getItem("user_name");
const pages = loggedIn ? ['Home', 'Task', 'Logout'] : ['Home', 'Task', 'Sign-In'];

export default function TopNav() {

	const handleLogout = () => {
		axios
			.post("http://localhost:3000/auth/logout") // Update with your API URL
			.then(() => {
				localStorage.removeItem("user_name");
				// setUser('');
				window.location.href = "/"; // Redirect to home page
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<AppBar position="static">
			<Toolbar className="cse4050-toolbar">
				<img src={logo} alt="Wener Works" />
				<Typography variant="h6" className="cse4050-logo">
				</Typography>
				<Stack
					direction="row"
					spacing={2}
					sx={{ '& a.active': { color: theme => theme.palette.primary.contrastText, bgcolor: theme => theme.palette.primary.main, } }}
				>
					{pages.map((page) => (
						<Button
							key={page}
							component={page === 'Logout' ? null : Link}
							to={page === 'Logout' ? null : "/" + page.toLowerCase()}
							sx={{ color: 'yellow' }}
							className="cse4050-toolbar-button"
							onClick={page === 'Logout' ? handleLogout : null}
						>
							{page}
						</Button>
					))}
				</Stack>
			</Toolbar>
		</AppBar>
	);
}
