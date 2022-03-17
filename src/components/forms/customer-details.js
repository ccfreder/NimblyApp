import React, { useEffect } from 'react';
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import TextareaAutosize from '@mui/material/TextareaAutosize';
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

//const countryApi = require('countrycitystatejson');

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

export function CustomerDetails({ selectedCustomer, enableEdit }) {
  const classes = useStyles();
  const navigate = useNavigate(); 
  
  const [hasError, setHasError] = useState(false);
  const [id, setId] = useState(selectedCustomer === null ? -1 : selectedCustomer.id);
  const [email, setEmail] = useState(selectedCustomer === null ? "" : selectedCustomer.email);
  const [fname, setFirstName] = useState(selectedCustomer === null ? "" : selectedCustomer.firstName);
  const [lname, setLastName] = useState(selectedCustomer === null ? "" : selectedCustomer.lastName);
  const [phone, setPhone] = useState(selectedCustomer === null ? "" : selectedCustomer.phone);
  const [gender, setGender] = useState(selectedCustomer === null ? "" : selectedCustomer.gender);
  const [address, setAddress] = useState(selectedCustomer === null ? "" : selectedCustomer.address);
  const [city, setCity] = useState(selectedCustomer === null ? "" : selectedCustomer.city);
  const [country, setCountry] = useState(selectedCustomer === null ? "" : selectedCustomer.country);
  const [state, setState] = useState(selectedCustomer === null ? "" : selectedCustomer.state);
  const [zipCode, setZipCode] = useState(selectedCustomer === null ? "" : selectedCustomer.zipCode);
  const [note, setNote] = useState(selectedCustomer === null ? "" : selectedCustomer.note);
  const [status, setStatus] = useState(selectedCustomer === null ? "" : selectedCustomer.status);
  const [dbo, setDbo] = useState(selectedCustomer === null ? new Date() : selectedCustomer.dbo);
  const [active, setActive] = useState(selectedCustomer === null ? { active: false } : { active: selectedCustomer.active });

  const userId = useSelector( (state) => state.user.userId);
  const accessToken = useSelector( (state) => state.auth.accessToken);

  const countries = [
    {name: "Canada", shortCode: "CA"},
  ]

  const provinces = [
    {name: "Alberta", shortCode: "AB"},
    {name: "British Columbia", shortCode: "BC"},
    {name: "Ontario", shortCode: "ON"},
    {name: "Manitoba", shortCode: "MB"},
    {name: "New Brunswick", shortCode: "NB"},
    {name: "Newfoundland and Labrador", shortCode: "NL"},
    {name: "Northwest Territories", shortCode: "NT"},
    {name: "Nova Scotia", shortCode: "NS"},
    {name: "Nunavut", shortCode: "NU"},
    {name: "Prince Edward Island", shortCode: "PE"},
    {name: "Quebec", shortCode: "QC"},
    {name: "Saskatchewan", shortCode: "SK"},
    {name: "Yukon", shortCode: "YT"}
  ]

  const handleActiveChange = (event) => {
    setActive({
      ...active,
      [event.target.name]: event.target.checked,
    });
  };

  const back = () => {
    enableEdit(false, false);
  };

  const options  = {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  };

  const data = {
    id: id,
    userId: userId,
    firstName: fname,
    lastName: lname,
    email: email,
    telephone: phone,
    dateOfBirth: dbo,
    gender: gender,
    note: note,
    address: address,
    city: city,
    state: state,
    country: country,
    zipCode: zipCode,
    status: status,
    active: active.active,
    accessToken: accessToken,
    refreshToken: null,
  };

  const url = selectedCustomer === null ? 'customer/addcustomer' : 'customer/updatecustomer';

  const handleSubmit = (e) => {
    axios.post(
      ConstantsList.API_URL + url,
      data,
      options
    ).then(response => {
      if (response.status === 200) {
        //showEdit(false, true);
        enableEdit(false, true);

        //navigate('/dashboard')
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

        { !hasError ? '' :
          <Alert id="errorMsg" severity="error">Update failed!</Alert>
        }

        <form className={classes.form} noValidate onSubmit={e => {handleSubmit(e)}}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <Typography variant="subtitle1">{selectedCustomer === null ? "Add Customer" : "Update Customer"}</Typography>
            </Grid>


            <Grid item xs={12}>
              <Button variant="contained" color="primary" size="large" startIcon={<ArrowBackIcon/>} onClick={back}>Back</Button>
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
                  defaultValue="male"
                  name="gender"
                  onChange={e => setGender(e.target.value)}
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
                  id="phone"
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
                  //countryCode.getCountries()
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
              <FormControl variant="outlined" className={classes.button}>
                <InputLabel id="role-label">Province</InputLabel>
                <Select
                  labelId="role-label"
                  id="role-select"
                  value={state}
                  
                  onChange={e => setState(e.target.value)}
                >

                {provinces.map((item, index) => (
                  <MenuItem key={item.shortCode} value={item.name}>{item.name}</MenuItem>
                ))}

                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.button}>
                <InputLabel id="role-label">Country</InputLabel>
                <Select
                  labelId="role-label"
                  id="role-select"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                >

                {countries.map((item, index) => (
                  <MenuItem key={item.shortCode} value={item.name}>{item.name}</MenuItem>
                ))}

                </Select>
              </FormControl>
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
                  id="status"
                  label="Status"
                  name="status"
                  autoComplete="status"
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                />
            </Grid>   

            <Grid item xs={12}>

              <TextareaAutosize
                id="note"
                name="note"
                label="Notes"
                maxRows={8}
                variant="outlined"
                margin="normal"
                className={classes.button}
                style={{ height: 100, width: 800 }}
                aria-label="maximum height"
                placeholder="Maximum 4 rows"
                defaultValue={note}
                onChange={e => setNote(e.target.value)}
              />

            </Grid>   
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" size="large" className={classes.button} startIcon={<SaveIcon />}> {selectedCustomer === null ? "Add" : "Update"}</Button>
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

export default connect(mapStateToProps)(CustomerDetails);