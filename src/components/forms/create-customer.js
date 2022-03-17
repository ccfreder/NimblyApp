import React from 'react';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
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

export function CreateCustomer(selectedCustomer, enableEdit)  {
  const classes = useStyles();
  const navigate = useNavigate();

  console.log('address: ' + JSON.stringify(selectedCustomer));

  const [hasError, setHasError] = useState(false);
  const [id, setId] = useState(selectedCustomer.id);
  const [email, setEmail] = useState(selectedCustomer.email);
  const [fname, setFirstName] = useState(selectedCustomer.firstName);
  const [lname, setLastName] = useState(selectedCustomer.lastName);
  const [phone, setPhone] = useState(selectedCustomer.phone);
  const [gender, setGender] = useState(selectedCustomer.gender);
  const [address, setAddress] = useState(selectedCustomer.address);
  const [city, setCity] = useState(selectedCustomer.city);
  const [state, setState] = useState(selectedCustomer.state);
  const [country, setCountry] = useState(selectedCustomer.country);
  const [zipCode, setZipCode] = useState(selectedCustomer.zipCode);
  const [note, setNote] = useState(selectedCustomer.note);
  const [status, setStatus] = useState(selectedCustomer.status);
  const [dbo, setDbo] = useState(selectedCustomer.dbo);
  const [active, setActive] = useState({ active: selectedCustomer.active });

  
  const accessToken = useSelector( (state) => state.auth.accessToken);

  // const handleRoleChange = (event) => {
  //   setRole(event.target.value);
  // };
  
  const handleActiveChange = (event) => {
    setActive({
      ...active,
      [event.target.name]: event.target.checked,
    });
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
    Id: id,
    FirstName: fname,
    LastName: lname,
    email: email,
    telephone: phone,
    dateOfBirth: dbo,
    gender: gender,
    note: note,
    status: status,
    address: address,
    city: city,
    state: state,
    country: country,
    zipCode: zipCode,
    accessToken: accessToken,
    refreshToken: null,
  };

  const handleSubmit = (e) => {
    axios.post(
      ConstantsList.API_URL + 'customer/createcustomer',
      data,
      options
    ).then(response => {
      if (response.status === 200) {
        //showEdit(false, true);
        enableEdit(false);

        navigate('/dashboard')
      }
    }).catch(error => {
      setHasError(true);
      console.log('Exception Error: ' + error);
    });
    
    e.preventDefault();
  }

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
    <Container component="main" maxWidth="xs">
      <CssBaseline>

      <Typography variant="subtitle1">Create Customer</Typography>

      { !hasError ? '' :
        <Alert id="errorMsg" severity="error">Update failed!</Alert>
      }

      <form className={classes.form} noValidate onSubmit={e => {handleSubmit(e)}}>
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" size="large" onClick={back}>Back</Button>
          </Grid>

          <Grid item xs={12}>

            <FormControlLabel control={
              <Switch checked={active.active} onChange={handleActiveChange} name="active" />
              } label="Active"
            />

          </Grid>

          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="gender"
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
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
                id="tel"
                label="Phone"
                name="phone"
                autoComplete="phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
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
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
          </Grid>

          <Grid item xs={12}>
            <TextField
                variant="outlined"
                className={classes.button}
                margin="normal"
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                autoComplete="city"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
          </Grid>

          <Grid item xs={12}>
            <TextField
                variant="outlined"
                className={classes.button}
                margin="normal"
                required
                fullWidth
                id="state"
                label="State"
                name="state"
                autoComplete="state"
                value={state}
                onChange={e => setState(e.target.value)}
              />
          </Grid>          

          <Grid item xs={12}>
            <TextField
                variant="outlined"
                className={classes.button}
                margin="normal"
                required
                fullWidth
                id="country"
                label="Country"
                name="country"
                autoComplete="country"
                value={country}
                onChange={e => setCountry(e.target.value)}
              />
          </Grid>

          <Grid item xs={12}>
            <TextField
                variant="outlined"
                className={classes.button}
                margin="normal"
                required
                fullWidth
                id="zipcode"
                label="ZipCode"
                name="zipcode"
                autoComplete="zipcode"
                value={zipCode}
                onChange={e => setZipCode(e.target.value)}
              />
          </Grid>

          <Grid item xs={12}>
            <TextField
                variant="outlined"
                className={classes.button}
                margin="normal"
                required
                fullWidth
                id="note"
                label="Notes"
                name="note"
                autoComplete="note"
                value={note}
                onChange={e => setNote(e.target.value)}
              />
          </Grid>

          <Grid item xs={12}>
          
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" size="large" className={classes.button} startIcon={<SaveIcon />}>Add Customer</Button>
          </Grid>

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

export default connect(mapStateToProps)(CreateCustomer);