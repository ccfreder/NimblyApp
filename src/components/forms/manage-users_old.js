//https://mui.com/components/data-grid/
//Theme generator
//https://bareynol.github.io/mui-theme-creator/

import React from 'react';
import { connect, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SignOut from './signout';

import { 
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid-pro';

import axios from 'axios';
import ConstantsList from '../../constants';
import { makeStyles } from '@mui/material/styles';

import EditUser from "./edit-user";

import { 
  AuthStatus
} from '../../actions/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(2),
  }
}));

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First Name', width: 130 },
  { field: 'lastName', headerName: 'Last Name', width: 130 },
  { field: 'userName', headerName: 'User Name', width: 220 },
  { field: 'email', headerName: 'Email', width: 220 },
  { field: 'role', headerName: 'Role', width: 140 },
  {
    field: 'active',
    headerName: 'Active',
    renderCell: (params) => (
      params.getValue('active') == true ? <CheckCircleIcon /> : <BlockIcon />
    ),
  },
  {
    field: 'fullName',
    headerName: 'Full Name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },
];

export function ManageUsers() {
  const classes = useStyles();

  let history = useNavigate();
  const loggedIn = useSelector( (state) => state.auth.loggedIn);
  const accessToken = useSelector( (state) => state.auth.accessToken);

  if(loggedIn == AuthStatus.LOG_OUT) {
    history.push('/signin');
  }

  const [rows, setRows] = useState([]);
  const [row, setSelectedRow] = useState(-1);
  const [edit, enableEdit] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  
  const DeleteUser = () => {
    console.log('rows selected => ' + JSON.stringify(selectedRows.length));
  };

  const showEdit = (flag, reload) => {
    enableEdit(flag);

    if(reload) {
      loadUsers();
    }
  };

  const handleRowClick = (selection) => {
    setSelectedRow(selection.row);
    
    showEdit(true, false);
  };

  const handleSelectionChange = (selection) => {
    setSelectedRows(selection.selectionModel);
  };

  const options  = {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}` 
    }
  };

  const param = {
    accessToken: accessToken,
    refreshToken: null
  };

  const url = ConstantsList.API_URL + 'user/getusers';

  function loadUsers() {
    const jsonData = [];
    
    axios.post(
      url, param, options
    ).then(res => {
      res.data.map((item, index) => (
          jsonData.push({
            id: item.userId,
            userName: item.userName,
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            role: item.role,
            active: item.active
          })
        ));

        setRows(jsonData);
    }).catch(error => {
      //setHasError(true);
      console.log('Exception Error: ' + error);
    });
  }
  
  useEffect(() => {
    loadUsers();
  },[]);

  return (
    <div id="main">
      { edit ?
        <div id="edit" style={{ height: 100, width: '50%' }}>
          <EditUser selectedUser={row} enableEdit={showEdit}/> 
        </div>
      : 
      <div id="grid" style={{ height: 400, width: '100%' }}>
          <Grid container spacing={3}>
            <Grid item xs={1}><Button variant="contained" color="secondary" className={classes.button} startIcon={<DeleteIcon />}>Delete</Button></Grid>
            <Grid item xs={1}><Button variant="contained" color="primary" className={classes.button} onClick={() => loadUsers()}>Reload</Button></Grid>
            <Grid item xs={8}></Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={1}><SignOut /></Grid>
          </Grid>

          <DataGrid 
            checkboxSelection
            rows={rows} 
            components={{
              Toolbar: CustomToolbar,
            }}
            onRowClick={handleRowClick}
            onSelectionModelChange={handleSelectionChange}
            columns={columns} 
            pageSize={5} /> 
        </div>  
      }
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

export default connect(mapStateToProps)(ManageUsers);
