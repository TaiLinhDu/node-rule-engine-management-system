import React, { useEffect } from 'react';
import { BrowserRouter, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Register from 'pages/Register/Register';
import Login from 'pages/Login/Login';
import axios from 'axios-orders';
import Home from 'pages/Home/Home';

function App() {
  
  useEffect(() => {
    let token = localStorage.getItem("token");
    let user = sessionStorage.getItem("user")
    if(token && !user) {
      axios.post("user/loginbytoken", {
        token: token
      }) 
      .then ((res) => {
        sessionStorage.clear();
        sessionStorage.setItem('user', res.data.docs);
        alert("welcome back !")
      })
      .catch((error) =>{
        console.log(error);
      })
      }
  },[]);

  return (
    <BrowserRouter>
      <div className="App">
        {/* <Header /> */}
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Redirect from="/" to="/home" />
        </Switch>
        {/* <Footer /> */}
      </div>
  </BrowserRouter>
  );
}

export default App;
