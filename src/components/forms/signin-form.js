import React from 'react';

import { useNavigate  } from "react-router-dom";
import { useState } from "react";
import { connect, useDispatch } from 'react-redux';

import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LockIcon from '@mui/icons-material/Lock';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Copyright from '../../helpers/copyright';

import axios from 'axios';
import ConstantsList from '../../constants';

import { makeStyles } from '@mui/styles';
import { red } from '@mui/material/colors';

import { 
  AuthStatus, 
  setAuthStatus, 
  setRegisteredUserEmail, 
  setRegisteredUserName, 
  setRegisteredUserFirstName, 
  setRegisteredUserLastName, 
  setRegisteredUserId, 
  setRegisteredUserRole,
  setAccessToken,
  setRefreshToken 
} from '../../actions/actions';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: 2,
    backgroundColor: 'ffffff',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 1,
  },
  submit: {
    margin: 3
  },
}));

function SignInForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);

  const [errorMsg, setErrorMsg] = useState('Username or password is incorrect!');

  const handleSubmit = (e) => {
    axios.post(ConstantsList.API_URL + 'auth/login', {
      username,
      password }
    ).then(response => {
        if (response.status === 200) {
          setFailedLogin(false);

          dispatch(setAuthStatus(AuthStatus.LOG_IN));
          dispatch(setAccessToken(response.data.accessToken));
          dispatch(setRefreshToken(response.data.refreshToken));

          dispatch(setRegisteredUserId(response.data.userId));
          dispatch(setRegisteredUserRole(response.data.role));
          dispatch(setRegisteredUserName(response.data.userName));
          dispatch(setRegisteredUserFirstName(response.data.firstName));
          dispatch(setRegisteredUserLastName(response.data.lastName));
          dispatch(setRegisteredUserEmail(response.data.email));
 
          navigate('/dashboard');
        }
    }).catch(error => {
      setFailedLogin(false);
      dispatch(setAuthStatus(AuthStatus.LOG_OUT));

      dispatch(setAccessToken(null));
      dispatch(setRefreshToken(null));
      dispatch(setAuthStatus(AuthStatus.FAILED_LOGIN));

      if (error.response) {
        setErrorMsg(error.response.data.message);

        console.log(error.response.data);
      } 
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
          Sign in
        </Typography>

        {failedLogin ? 
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>{errorMsg}</strong>
          </Alert>

          : ''
        }

        <form className={classes.form} noValidate onSubmit={e => {handleSubmit(e)}}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => setUserName(e.target.value)}
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
            label="Remember me"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In

          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account yet? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </ div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = function (state) {
  return {
      userId: state.user.userId,
      email: state.user.email,
      role: state.user.role,
      username: state.user.username,
      firstName: state.user.firstName,
      lastName: state.user.lastName,
      loggedIn: state.auth.loggedIn,
      accessToken: state.auth.accessToken,
      refreshToken: state.auth.refreshToken
  }
}

export default connect(mapStateToProps)(SignInForm);