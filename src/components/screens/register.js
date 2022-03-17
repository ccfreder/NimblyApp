import React from 'react';
import { makeStyles } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import Register from '../forms/register';
import banner from './assets/printglobal.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'row',
  },
  marginAutoItem: {
    backgroundColor: 'white',
    margin: 'auto',
    width: 1050,
  },
}));

export default function RegisterScreen() {
  const classes = useStyles();

  return (
    <Container component="main">
      <CssBaseline>
      <div className={classes.marginAutoItem}>
        <div className={classes.paper}>
          <img src={banner} alt="banner" />
          <Register />
        </div>
      </div>
      </CssBaseline>
    </Container>
  );
}
