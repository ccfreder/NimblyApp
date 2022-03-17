import * as React from 'react';
import { connect, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GroupIcon from '@mui/icons-material/Group';

import ManageUsers from '../screens/manage-users';
import ManageCustomers from '../screens/manage-customers';
//import CreateCustomer from '../forms/create-customer';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 624, width: 600 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 424 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Displays vertical tabs"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label = "Users" icon={<GroupIcon/>} {...a11yProps(0)} />
        <Tab label="Customers" icon={<GroupIcon/>} {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <ManageUsers />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ManageCustomers />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
    </Box>
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

export default connect(mapStateToProps)(VerticalTabs);

//export default VerticalTabs;