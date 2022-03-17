import React from 'react';

import { makeStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import SignInForm from '../forms/signin-form';

import banner from './assets/printglobal.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  marginAutoItem: {
    backgroundColor: 'white',
    margin: 'auto',
    width: 1050,
  },
}));

export default function SignInScreen() {
  const classes = useStyles();

  return (
    <Container component="main">
      <CssBaseline>
      <div className={classes.marginAutoItem}>
        <div className={classes.paper}>
          <img src={banner} alt="banner" />
          <SignInForm />
        </div>
      </div>
      </CssBaseline>
    </Container>
  );
}