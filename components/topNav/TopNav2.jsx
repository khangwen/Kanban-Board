import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import AppBar from '../home/modules/components/AppBar';
import Toolbar from '../home/modules/components/Toolbar';
import withRoot from '../home/modules/withRoot';
import axios from "axios";

const loggedIn = localStorage.getItem("user_name");

const rightLink = {
    fontSize: 16,
    color: 'common.white',
    ml: 3,
};

function TopNav2() {

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
        <div>
            <AppBar position="fixed">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ flex: 1 }} />
                    <Link
                        variant="h6"
                        underline="none"
                        color="inherit"
                        href="/home"
                        sx={{ fontSize: 24 }}
                    >
                        {'Wener Works'}
                    </Link>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Link
                            color="inherit"
                            variant="h6"
                            underline="none"
                            href="/sign-in"
                            sx={rightLink}
                        >
                            {loggedIn ? null : 'Sign In'}
                        </Link>
                        <Link
                            variant="h6"
                            underline="none"
                            href="/register"
                            sx={{ ...rightLink, color: 'secondary.main' }}
                        >
                            {loggedIn ? null : 'Sign Up'}
                        </Link>
                        <Button
                            variant="h6"
                            underline="none"
                            sx={{ ...rightLink, color: 'secondary.main' }}
                            onClick={loggedIn ? handleLogout : null}
                            style={{ display: loggedIn ? 'block' : 'none' }}
                        >
                            {loggedIn ? 'Logout' : null}
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </div >
    );
}

export default withRoot(TopNav2);
