import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios-orders';

const Login = () => {
    let history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect (() => {
        localStorage.clear();
    },[]);

    const loginHandler = (e: any) => {
        e.preventDefault();

        axios.post('/user/login', {
            email: email,
            password: password
        })
        .then(function (res) {
            // console.log(res);
            localStorage.setItem('token', res.data.token);
            sessionStorage.setItem('use', res.data.docs);
            history.push("/home");
          })
        .catch(function (error) {
            alert(error);
        });
    }

    return (
        <>
        Login
        <form onSubmit={loginHandler}>
                <div>
                    <label>Email</label>
                    <input type="text" onChange={(e) => {setEmail(e.target.value)}}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" onChange={(e) => {setPassword(e.target.value)}}/>
                </div>

                <input type="submit" value="Login"/>
            </form>
        </>
    );
}

export default Login;