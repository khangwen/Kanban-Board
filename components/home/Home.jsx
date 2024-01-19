import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const isLoggedIn = localStorage.getItem("user_name");

export default function Home() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h6" component="h1" sx={{ mt: 2, color: 'black' }} gutterBottom>
        Welcome to Wener Works
      </Typography>
      <Typography variant="body1" component="p" sx={{ color: 'black' }} gutterBottom>
        {isLoggedIn ? 'Welcome ' + localStorage.getItem("user_name") + "!" : null}
      </Typography>
      <Typography variant="body1" component="p" sx={{ color: 'black' }} gutterBottom>
        Unlock the inner Wener in you. To navigate to current tasks, please click on the Task button in the top right corner.
      </Typography>
    </Container >
  );
}
