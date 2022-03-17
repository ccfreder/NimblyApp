import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import PersonAdd from '@mui/icons-material/PersonAdd';

import CreateCustomer from "../forms/create-customer";
import CustomerDetails from "../forms/customer-details";
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

function ManageCustomers() {
    const classes = useStyles();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loggedIn = useSelector( (state) => state.auth.loggedIn);
    const accessToken = useSelector( (state) => state.auth.accessToken);

    if(loggedIn === AuthStatus.LOG_OUT) {
      navigate('/signin');
    }

    const [rows, setRows] = useState([]);
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [edit, enableEdit] = useState(false);
    const [selectedRow, setSelectedRow] = useState(-1);
    const [selectedRows, setSelectedRows] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    
    const showEdit = (flag, reload) => {
      enableEdit(flag);
  
      if(reload) {
        loadCustomers();
      }
    };

    // useEffect(() => {
    //     const productService = new ProductService();
    //     productService.getUsers().then(data => setRows({ users: data }));
    // },[]);

    const handleAddCustomer = (event) => {
      setSelectedRow(null);

      showEdit(true, false);
      //navigate('/CreateCustomer');
    };
    
    const handleSearch = () => {
      //selectedRows.map(row => (
     //   console.log('rows selected => ' + row)
     // ))
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
      //setSelectedRows(selection);
      //  selection.map((number) =>
      //    console.log('selected rows -> ' + number)
      //  );

      //console.log('selected rows -> ' + selectedRows);
      // if(selectedRows === 0)
      //   setBtnDisabled(true);
      // else
      //   setBtnDisabled(false);
      
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
  
    const url = ConstantsList.API_URL + 'customer/getcustomers';
  
    function loadCustomers() {
      const jsonData = [];
      setRows([]);

      axios.post(
        url, param, options
      ).then(res => {
        res.data.map((item, index) => (
            jsonData.push({
              id: item.id,
              firstName: item.firstName,
              lastName: item.lastName,
              dbo: item.dateOfBirth,
              phone: item.telephone,
              email: item.email,
              address: item.address,
              city: item.city,
              state: item.state,
              country: item.country,
              zipCode: item.zipCode,
              active: item.active,
              status: item.status,
              note: item.note,
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
      loadCustomers();
    },[]);

    const columns = [
      { field: 'id', headerName: 'ID', width: 50 },
      {
        field: 'fullName',
        headerName: 'Full name',
        width: 160,
        valueGetter: getFullName,
      },      
      //{ field: 'dbo', headerName: 'DOB', width: 83 },
      { field: 'gender', headerName: 'Gender', width: 90 },
      { field: 'phone', headerName: 'Phone', width: 100 },
      { field: 'email', headerName: 'Email', width: 200 },
      { field: 'address', headerName: 'Address', width: 200 },
      { field: 'city', headerName: 'City', width: 100 },
      { field: 'state', headerName: 'State', width: 100 },
      { field: 'country', headerName: 'Country', width: 100 },
      { field: 'zipCode', headerName: 'ZipCode', width: 80 },
      { field: 'active', headerName: 'Active', type: 'boolean', width: 80 },
      { field: 'status', headerName: 'Status', type: 'string', width: 100 },
      //{ field: 'note', headerName: 'Note', type: 'string', width: 100 },
      { field: 'created', headerName: 'Created', type: 'date', width: 190 },
      {  width: 190,
      renderCell: (params) => {
          const onClick = (e) => {
            e.stopPropagation(); // don't select this row after clicking

            return alert(params.id);
          }
          return <Button variant="outlined" startIcon={<DeleteIcon />} onClick={onClick}>Delete</Button>;
        }
      }
    ];

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline>
        { edit ?
            <div id="edit" style={{ height: 100, width: 1000 }}>
              <CustomerDetails selectedCustomer={selectedRow} enableEdit={showEdit}/>
            </div>
        :
            <div id="grid" style={{ height: 580, width: 1380 }}>
              <Grid container spacing={3}>
                  <Grid item xs={1}><Button variant="contained" color="secondary" className={classes.button} onClick={handleSearch} startIcon={<SearchIcon />} disabled={btnDisabled}>Search</Button></Grid>
                  <Grid item xs={1}><Button variant="contained" color="primary" className={classes.button} onClick={() => loadCustomers()}>Reload</Button></Grid>
                  <Grid item xs={7}><Button variant="contained" color="primary" className={classes.button} onClick={() => handleAddCustomer()} startIcon={<PersonAdd />} /></Grid>
              </Grid>   

              <DataGrid 
                rows={rows} 
                getRowId={(row) => row.id} 
                columns={columns} 
                pagination
                disableSelectionOnClick 
                pageSize={pageSize}
                checkboxSelection={false} 
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
  
  export default connect(mapStateToProps)(ManageCustomers);