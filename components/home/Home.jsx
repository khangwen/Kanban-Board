import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import withRoot from './modules/withRoot';

const isLoggedIn = localStorage.getItem("user_name");

function Index() {
  return (
    <React.Fragment>
      <ProductHero />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);