import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import Button from '@mui/material/Button';

import ConstantsList from '../../constants';
import axios from 'axios';

import { 
  AuthStatus, 
  setAuthStatus,  
  setAccessToken,
  setRefreshToken 
} from '../../actions/actions';

export function SignOut()  {
  let history = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector( (state) => state.auth.accessToken);
  const refreshToken = useSelector( (state) => state.auth.refreshToken);
  
  const options  = {
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}` 
    }
  };

  const data = {
    accessToken: accessToken,
    refreshToken: refreshToken
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(
      ConstantsList.API_URL + 'auth/logout',
      data,
      options
    ).then(response => {
        if (response.status === 200) {
            dispatch(setAccessToken(null));
            dispatch(setRefreshToken(null));
            dispatch(setAuthStatus(AuthStatus.LOG_OUT));
  
            history.push('/');
        }
    }).catch(error => {
      console.log('Exception Error: ' + error);
    });
  }

  return (
    <form onSubmit={e => {handleSubmit(e)}} style={{marginTop: 16}}>
      <Button type="submit" variant="contained" color="primary">
        Signout
      </Button>
    </form>
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

export default connect(mapStateToProps)(SignOut);