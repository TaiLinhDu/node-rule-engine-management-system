import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import './App.css';
import {IUser} from 'models/user.model';
import Register from 'pages/Register/Register';
import Login from 'pages/Login/Login';
import axios from 'axios-backend';
import Home from 'pages/Home/Home';
import AdminDashboard from 'pages/AdminDashboard/AdminDashboard';
import RuleDashboard from 'pages/RuleDashboard/RuleDashboard';
import BusinessRuleEditor from 'pages/BusinessRuleEditor/BusinessRuleEditor';

import { roleService } from 'services/roleService/role-service'

import { RoleContext } from 'helper/contexts/role-context';


function App() {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [roles, setRoles] = useState([]);
  let userString =  sessionStorage.getItem("user");
  const [user, setUser] = useState<IUser>(userString? JSON.parse(userString) : {}) ;

  if (token && !userString) {
      axios.post("user/loginbytoken", {
        token: token
      }) 
      .then ((res) => {
        sessionStorage.clear();
        sessionStorage.setItem('user', JSON.stringify(res.data.docs));
        setUser(res.data.docs);
        console.log("User APP", res.data.docs)
      })
      .catch((error) =>{
        console.log(error);
      })
  }
  
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log("welcome back")
    }

    roleService.getRoles()
    .then(res => {
      if (res.status = 200){
        console.log(res.data.docs)
        setRoles(res.data.docs)
        console.log("Roles APP", res.data.docs)
      }
    })
    .catch((error) =>{
      console.log(error);
    })
  },[]);

  return (
    <RoleContext.Provider value={roles}>

      <BrowserRouter>
        <div className="App">
          {/* <Header /> */}
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/ruleeditor" component={BusinessRuleEditor} />
            <Route path="/admindashboard" component={AdminDashboard} />
            <Route path="/ruledashboard" component={RuleDashboard} />
            <Redirect from="/" to="/home" />
          </Switch>
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    </RoleContext.Provider>
  );
}

export default App;
