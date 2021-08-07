import React, { useState } from 'react';
import axios from 'axios-orders';


const Register = (props: any) => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [password, setPassword] = useState("");
    const [isConfirmPasswordRight, setIsConfirmPasswordRight] = useState(false);

    console.log(process.env.BACKEND_URL);

    const registerHander = (e: any) => {
        if (isConfirmPasswordRight) {
            e.preventDefault();


            axios.post('/user/register', {
                email: email,
                name: name,
                company: company,
                password: password
            })
            .then(function (response) {
                alert(response);
              })
            .catch(function (error) {
            alert(error);
            });
        }
    }

    return(
        <div>
            Register
            <form onSubmit={registerHander}>
                <div>
                    <label>Email</label>
                    <input type="text" onChange={(e) => {setEmail(e.target.value)}}/>
                </div>
                <div>
                    <label>Name</label>
                    <input type="text" onChange={(e) => {setName(e.target.value)}}/>
                </div>
                <div>
                    <label>Company</label>
                    <input type="text" onChange={(e) => {setCompany(e.target.value)}}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
                <div>
                    <label>Password Confirm</label>
                    <input type="password" onChange={(e) => {e.target.value === password ? setIsConfirmPasswordRight(true) : setIsConfirmPasswordRight(false)}}/>
                </div>

                <input type="submit" value="Register"/>
            </form>
        </div>
    )
}

export default Register;