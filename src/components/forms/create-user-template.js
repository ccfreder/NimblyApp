import React from 'react';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import axios from 'axios';
import ConstantsList from '../../constants';

import { useState, useEffect } from "react";
import { connect, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    margin: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function CreateUser() {
  const classes = useStyles();
  let history = useHistory();
  
  const [hasError, setHasError] = useState(false);

  const [role, setRole] = useState();
  const [fname, setFirstName] = useState();
  const [lname, setLastName] = useState();
  const [email, setEmail] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const accessToken = useSelector( (state) => state.auth.accessToken);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  
  const handleActiveChange = (event) => {
    setIsActive(event.target.value);
  };
  const back = () => {
    enableEdit(false, false);
  };

  const showEdit = (flag, reload) => {
    enableEdit(flag, reload);
  };

  const options  = {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  };

  const data = {
    userName: username,
    firstName: fname,
    lastName: lname,
    password: password,
    role: role,
    email: email,
    active: isActive,
    accessToken: accessToken,
    refreshToken: null,
  };

  const url = ConstantsList.API_URL + 'user/update';

  const handleSubmit = (e) => {
    axios.post(url, data, options)
    .then(response => {
      if (response.status === 200) {
        showEdit(false, true);
      }
    }).catch(error => {
      setHasError(true);
      console.log('Exception Error: ' + error);
    });

    e.preventDefault();
  }

  return (
    <div>
      <Typography>Create User</Typography>
      <Button variant="contained" color="primary" size="large" className={classes.button} startIcon={<ArrowBackIcon/>} onClick={back}>Back</Button>

      { !hasError ? '' :
        <Alert id="errorMsg" severity="error">Update failed!</Alert>
      }

      <form className={classes.form} noValidate onSubmit={e => {handleSubmit(e)}}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <FormControl variant="outlined" className={classes.button}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role-select"
                  value={role}
                  onChange={handleRoleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Super Admin'}>Super Admin</MenuItem>
                    <MenuItem value={'Admin'}>Admin</MenuItem>
                    <MenuItem value={'General'}>General</MenuItem>
                  <MenuItem value={'Registered'}>Registered</MenuItem>
                </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
          <FormControl variant="outlined" className={classes.button}>
                <InputLabel id="active-label">Active</InputLabel>
                <Select
                  labelId="active-label"
                  id="active-select"
                  value={isActive}
                  onChange={handleActiveChange}
                >
                    <MenuItem value={true}>True</MenuItem>
                    <MenuItem value={false}>False</MenuItem>
                </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
              <TextField
                variant="outlined"
                className={classes.button}
                margin="normal"
                required
                fullWidth
                id="fname"
                label="First Name"
                name="fname"
                autoComplete="fname"
                autoFocus
                value={fname}
                onChange={e => setFirstName(e.target.value)}
              />
          </Grid>
          <Grid item xs={6}>
              <TextField
                variant="outlined"
                className={classes.button}
                margin="normal"
                required
                fullWidth
                id="lname"
                label="Last Name"
                name="lname"
                autoComplete="lname"
                value={lname}
                onChange={e => setLastName(e.target.value)}
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
                variant="outlined"
                className={classes.button}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                disabled={true}
                value={username}
                onChange={e => setUserName(e.target.value)}
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
                variant="outlined"
                className={classes.button}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
          </Grid>          
          <Grid item xs={12}>
            <TextField
                variant="outlined"
                className={classes.button}
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                type="password"
                name="password"
                autoComplete="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
          </Grid>
          <Grid item xs={3}>
            <Button type="submit" variant="contained" color="primary" size="large" className={classes.button} startIcon={<SaveIcon />}>Save</Button>
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </form>
    </div>
  );
}

const mapStateToProps = function (state) {
  
  return {
    userId: state.user.userId,
    email: state.user.email,
    username: state.user.username,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    loggedIn: state.auth.loggedIn,
    accessToken: state.auth.accessToken,
    refreshToken: state.auth.refreshToken
  }
}

export default connect(mapStateToProps)(CreateUser);