import React from 'react';
import { connect } from 'react-redux';

import axios from 'axios';
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export function  WeatherResults({ loaddata }) {
    const [weatherData, setWeatherData] = useState([]);
    const [hasError, setErrors] = useState(false);
    const accessToken = useSelector( (state) => state.auth.accessToken);
  
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
  
    const url = 'http://localhost:51305/api/weatherforecast/getweather';
  
    const weatherObj = [];
  
    useEffect(() => {
      if(!loaddata)
        return;
  
        axios.post(url, param, options)
        .then(res => {
          res.data.map((item, index) => (
            weatherObj.push({
              date: item.date,
              temperatureC: item.temperatureC,
              temperatureF: item.temperatureF,
              summary: item.summary
            })
          ));
  
          setWeatherData(weatherObj);
        }).catch(error => {
          setErrors(true);
        });
    }, [loaddata]);
  
    return (
      <div>
        {
          weatherData.map((item, index) => (
            <div>
              <p>Date: {item.date} </p>
              <p>C: {item.temperatureC} </p>
              <p>F: {item.temperatureF} </p>
              <p>Summary: {item.summary} </p>
              <hr />
            </div>
          ))
        }
      
        <span>Has error: {JSON.stringify(hasError)}</span>
      </div>
    );
  };
  
  WeatherResults.propTypes = {
    loaddata: PropTypes.bool.isRequired
  };

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
  
  export default connect(mapStateToProps)(WeatherResults);