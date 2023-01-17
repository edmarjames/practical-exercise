import { Button, Form, Container }  from "react-bootstrap";
// import LoginForm from '../components/LoginForm';

import { useState, useEffect, useContext }  from 'react';

import { Navigate } from 'react-router-dom';

import Swal from 'sweetalert2'

import UserContext from '../UserContext';

export default function Login() {

    const { user, setUser } = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    // console.log(username);
    // console.log(password);

    function authenticate(e) {

        e.preventDefault();

        fetch('https://corsanywhere.herokuapp.com/https://netzwelt-devtest.azurewebsites.net/Account/SignIn', {
            method: 'POST',
            headers: {
                'Content-type':'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            
            if (data.username === username) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Welcome back ${data.username}`,
                    showConfirmButton: false,
                    timer: 1500
                });
                setUser({
                    username: data.username,
                    displayName: data.displayName
                });
                localStorage.setItem('user', data.username);
            
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `Login failed`,
                    text: 'Check your credentials',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });

        setUsername('');
        setPassword('');
    }

    useEffect(() => {
        if (username !== '' && password !== '') {
            setIsComplete(true);
        } else {
            setIsComplete(false);
        }
    },[username, password, isComplete]);

    return (
        ( user.username !== null && localStorage.getItem('user') !== null) ?
            <Navigate to="/home/index" />
        :
        <Container className="my-5 py-5">
        <div className="d-flex justify-content-center align-items-center w-50 mx-auto my-5 py-5 m-0 border">
            <Form className="w-50">
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter username" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}    
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}   
                    />
                </Form.Group>
            
                { isComplete ? 
                    <Button variant="primary" type="submit" onClick={e => authenticate(e)}>Login</Button>
                :
                    <Button variant="primary" type="submit" disabled>Login</Button>
                }
                
            </Form>
        </div>
    </Container>
    )
}