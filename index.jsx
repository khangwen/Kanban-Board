import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Page from './components/template/Page';
import Home from './components/home/Home';
import TaskList from './components/task/TaskList';
import SignInSide from './components/sign-in/SignInSide';
import Register from './components/register/Register';

const Protected = function ({ children }) {
  const localUser = localStorage.getItem("user_name");
  return localUser ? children : <Navigate to="/sign-in" replace />;
};

const LoggedIn = function ({ children }) {
  const localUser = localStorage.getItem("user_name");
  return localUser ? <Navigate to="/" replace /> : children;
};

const theme = createTheme({
  palette: {
    background: {
      default: "#EBEDF0"
    }
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/task",
        element: <Protected><TaskList /></Protected>,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <LoggedIn><SignInSide /></LoggedIn>,
  },
  {
    path: "/register",
    element: <LoggedIn><Register /></LoggedIn>,
  }
]);

var view = (
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} fallbackElement={<Page />} />
    </ThemeProvider>
  </React.StrictMode>
);


const root = ReactDOM.createRoot(document.getElementById('reactapp'));
root.render(view);
