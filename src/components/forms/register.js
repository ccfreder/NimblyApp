import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Copyright from '../../helpers/copyright';

import axios from 'axios';
import ConstantsList from '../../constants';

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: 1,
    backgroundColor: 'ffffff',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 1,
  },
  submit: {
    margin: 3,
  },
}));

export function Register()  {
  const classes = useStyles();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  //const [username, setUserName] = useState("");
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(true);

  const options  = {
    headers: { 
      'Content-Type': 'application/json'
    }
  };

  const data = {
    UserName: email,
    FirstName: fname,
    LastName: lname,
    email: email,
    Password: password
  };

  const handleSubmit = (e) => {
    axios.post(
      ConstantsList.API_URL + 'user/register',
      data,
      options
    ).then(response => {
        if (response.status === 200) {
            navigate('/signin');
        }
    }).catch(error => {
      setHasError(true);
      console.log('Exception Error: ' + error);
    });
    
    e.preventDefault();
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        
        {hasError ? '' :
          <Alert id="errorMsg" severity="error">Registration failed!</Alert>
        }

        <form className={classes.form} noValidate onSubmit={e => {handleSubmit(e)}}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fname"
            label="First Name"
            name="fname"
            autoComplete="fname"
            autoFocus
            onChange={e => setFirstName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lname"
            label="Last Name"
            name="lname"
            autoComplete="lname"
            onChange={e => setLastName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />
          
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="I want to receive marketing promotions and updates via email."
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signin" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default (Register);