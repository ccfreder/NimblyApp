import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAdd from '@mui/icons-material/PersonAdd';

import UserDetails from "../forms/user-details";
//import { ProductService } from '../../services/ProductService';

import axios from 'axios';
import ConstantsList from '../../constants';

import { 
  AuthStatus, 
  setAuthStatus,
  setRegisteredUserRole, 
  // setRegisteredUserEmail, 
  // setRegisteredUserName, 
  // setRegisteredUserFirstName, 
  // setRegisteredUserLastName, 
  // setRegisteredUserId, 
  // setAccessToken,
  // setRefreshToken 
} from '../../actions/actions';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: 2,
    marginTop: 2,
  }
}));

function getFullName(params) {
  return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
}

function ManageUsers() {
    const classes = useStyles();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const role = useSelector( (state) => state.user.role);
    const loggedIn = useSelector( (state) => state.auth.loggedIn);
    const accessToken = useSelector( (state) => state.auth.accessToken);


    if(loggedIn === AuthStatus.LOG_OUT) {
      navigate('/signin');
    }

    const [rows, setRows] = useState([]);
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [edit, enableEdit] = useState(false);
    const [selectedRow, setSelectedRow] = useState(-1);
    const [selectedRows, setSelectedRows] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    
    const showEdit = (flag, reload) => {
      enableEdit(flag);
  
      if(reload) {
        loadUsers();
      }
    };

    // useEffect(() => {
    //     const productService = new ProductService();
    //     productService.getUsers().then(data => setRows({ users: data }));
    // },[]);

    const handleAddUser = (event) => {
      navigate('/register');
    };
    
    const handleDeleteUser = () => {
      selectedRows.map(row => (
        console.log('rows selected => ' + row)
      ))
    };

    const handleSignOut = () => {
      dispatch(setRegisteredUserRole('None'));
      dispatch(setAuthStatus(AuthStatus.LOG_OUT));
      navigate('/signin');
    }

    const handleRowClick = (params, event) => {
      setSelectedRow(params.row);
      //console.log('datagrid row click ' + params.id);

      showEdit(true, false);
    };

    const handleSelectionChange = (selection) => {
      setSelectedRows(selection);
      // selection.map((number) =>
      //   console.log(number)
      // );

      setBtnDisabled(false);
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
      setRows([]);

      axios.post(
        url, param, options
      ).then(res => {
        res.data.map((item, index) => (
            jsonData.push({
              id: item.id,
              userName: item.userName,
              firstName: item.firstName,
              lastName: item.lastName,
              dateOfBirth: item.dateOfBirth,
              email: item.email,
              role: item.role,
              active: item.active,
              created: item.created 
            })
          ));
  
          if(jsonData.length === 0)
            handleSignOut();
              
          setRows(jsonData);
      }).catch(error => {
        //setHasError(true);
        console.log('Exception Error: ' + error);
      });
    }
    
    useEffect(() => {
      loadUsers();
    },[]);

    const columns = [
      { field: 'id', headerName: 'ID', width: 50 },
      {
        field: 'fullName',
        headerName: 'Full name',
        width: 160,
        valueGetter: getFullName,
      },      
      //{ field: 'firstName', headerName: 'First Name', width: 150 },
      //{ field: 'lastName', headerName: 'Lastname', width: 150 },
      { field: 'userName', headerName: 'User Name', type: 'string', editable: false, width: 170 },
      { field: 'role', headerName: 'Role', width: 100 },
      { field: 'email', headerName: 'Email', width: 260 },
      { field: 'dateOfBirth', headerName: 'DOB', width: 83 },
      { field: 'active', headerName: 'Active', type: 'boolean', width: 100 }
      
    ];

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline>
        { edit ?
            <div id="edit" style={{ height: 100, width: 1000 }}>
              <UserDetails selectedUser={selectedRow} enableEdit={showEdit}/>
            </div>
        :
            <div id="grid" style={{ height: 580, width: 1380 }}>
              <Grid container spacing={3}>
                  <Grid item xs={1}><Button variant="contained" color="secondary" className={classes.button} onClick={handleDeleteUser} startIcon={<DeleteIcon />} disabled={btnDisabled}>Delete</Button></Grid>
                  <Grid item xs={1}><Button variant="contained" color="primary" className={classes.button} onClick={() => loadUsers()}>Reload</Button></Grid>
                  <Grid item xs={7}><Button variant="contained" color="primary" className={classes.button} onClick={() => handleAddUser()} startIcon={<PersonAdd />} /></Grid>
              </Grid>   

              <DataGrid 
                rows={rows} 
                getRowId={(row) => row.id} 
                columns={columns} 
                pagination
                pageSize={pageSize}
                checkboxSelection={true} 
                rowsPerPageOptions={[10, 50, 100, 500]}
                //onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}

                onRowClick={handleRowClick}
                onSelectionModelChange={handleSelectionChange} 
              />
            </div>
        }
        </CssBaseline>
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
  
  export default connect(mapStateToProps)(ManageUsers);