import React from 'react';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
//import Icon from '@mui/material/Icon';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
//import DateTimePicker from '@mui/lab/DateTimePicker';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import moment from 'moment';

import DateAdapter from '@date-io/moment';
//import { ThemeProvider } from '@mui/material/styles';

import LocalizationProvider from '@mui/lab/LocalizationProvider';

import axios from 'axios';
import ConstantsList from '../../constants';

import { useState } from "react";
import { connect, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { sassTrue } from 'sass';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
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
  formControl: {
    margin: 1,
    minWidth: 120,
  },
  button: {
    margin: 1,
  },
  submit: {
    margin: 3
  },
}));

export function UserDetails({ selectedUser, enableEdit }) {
  const classes = useStyles();
  const navigate = useNavigate();
  
  const [hasError, setHasError] = useState(false);
  const [userId, setId] = useState(selectedUser.id);
  const [role, setRole] = useState(selectedUser.role);
  const [dbo, setDbo] = useState(selectedUser.dateOfBirth);
  const [fname, setFirstName] = useState(selectedUser.firstName);
  const [lname, setLastName] = useState(selectedUser.lastName);
  const [email, setEmail] = useState(selectedUser.email);
  const [username, setUserName] = useState(selectedUser.userName);
  const [password, setPassword] = useState(selectedUser.password);
  const [active, setActive] = React.useState({ active: selectedUser.active });

  const accessToken = useSelector( (state) => state.auth.accessToken);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  
  const handleActiveChange = (event) => {
    setActive({
      ...active,
      [event.target.name]: event.target.checked,
    });
  };
  
  const back = () => {
    enableEdit(false, sassTrue);
  };

  const options  = {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  };

  const data = {
    id: userId,
    userName: username,
    firstName: fname,
    lastName: lname,
    password: password,
    role: role,
    email: email,
    dateOfBirth: dbo,
    active: active.active,
    accessToken: accessToken,
    refreshToken: null,
  };

  const url = ConstantsList.API_URL + 'user/update';

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(url, data, options)
    .then(response => {
      if (response.status === 200) {
        enableEdit(false, true);
        //enableEdit(false);
        //navigate('/dashboard')
      }
    }).catch(error => {
      setHasError(true);
      console.log('Exception Error: ' + error);
    });
  }

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
    <Container component="main" maxWidth="xs">
      <CssBaseline>

      <Typography variant="subtitle1">Edit User</Typography>

      { !hasError ? '' :
        <Alert id="errorMsg" severity="error">Update failed!</Alert>
      }

      <form className={classes.form} noValidate onSubmit={e => {handleSubmit(e)}}>
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" size="large" startIcon={<ArrowBackIcon/>} onClick={back}>Back</Button>
          </Grid>

          <Grid item xs={6}>
            <FormControl variant="outlined" className={classes.button}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role-select"
                  value={role}
                  onChange={handleRoleChange}
                >
                  <MenuItem value={'super admin'}>Super Admin</MenuItem>
                  <MenuItem value={'Admin'}>Admin</MenuItem>
                  <MenuItem value={'General'}>General</MenuItem>
                  <MenuItem value={'Registered'}>Registered</MenuItem>
                </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>

            <FormControlLabel control={
              <Switch checked={active.active} onChange={handleActiveChange} name="active" />
              } label="Active"
            />

          </Grid>

          <Grid item xs={12}>
            <MobileDateTimePicker
              label="DBO"
              value={dbo}
              onChange={(newValue) => {
              setDbo(moment(newValue).format('YYYY-MM-DDTHH:mm:ss'));
            }}
            renderInput={(params) => <TextField {...params} />}
            />
          </Grid> 

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

          <Grid item xs={6}>
            <Button type="submit" variant="contained" color="primary" size="large" className={classes.button} startIcon={<SaveIcon />}>Save</Button>
          </Grid>

          <Grid item xs={6}></Grid>
        </Grid>
      </form>
      
      </CssBaseline>
    </Container>
    </LocalizationProvider>
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

export default connect(mapStateToProps)(UserDetails);