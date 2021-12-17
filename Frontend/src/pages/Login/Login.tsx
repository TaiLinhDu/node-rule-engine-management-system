import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios-backend';

const Login = () => {
    let history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect (() => {
        localStorage.clear();
        sessionStorage.clear();
    },[]);

    const loginHandler = (e: any) => {
        e.preventDefault();

        axios.post('/user/login', {
            email: email,
            password: password
        })
        .then(function (res) {
            if (res.status === 200){
                console.log(axios);
                localStorage.setItem('token', res.data.token);
                sessionStorage.setItem('user', JSON.stringify(res.data.docs));
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                alert("welcome back")
                setTimeout(() => {history.push("/home")}, 1000);
            }

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