//https://styled-components.com/docs/basics#getting-started
//https://material-ui.com/getting-started/templates/

import React, { Component } from 'react';
//import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

//import Home from './components/screens/home';
import SignInScreen from './components/screens/signin';
import Dashboard from './components/screens/dashboard';
import Register from './components/forms/register';
import CreateCustomer from './components/forms/create-customer';
import ManageUsers from './components/screens/manage-users';

import PrimarySearchAppBar from './components/forms/primarySearchAppBar'

const Home = () => <h1>Home Component</h1>;
const About = () => <h1>About Component</h1>;
const ContactUs = () => <h1>Contact Us</h1>;
const Settings = () => <h1>Settings</h1>;
const NotFound  = () => <h1>Not Found</h1>;

class App extends Component {
  render() {
    return (
        <Router>
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/register" element={<Register />} />
              <Route path="/createcustomer" element={<CreateCustomer />} />
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/search" element={<PrimarySearchAppBar />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
    );
  }
}

export default App;