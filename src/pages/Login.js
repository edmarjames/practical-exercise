// import built-in react modules
import { useState, useEffect, useContext }      from 'react';
import { Button, Form, Container }              from "react-bootstrap";

// import UserContext
import UserContext                              from '../UserContext';

// import downloaded packages
import { Navigate }                             from 'react-router-dom';
import Swal                                     from 'sweetalert2'


// export the function so that it can be use anywhere
export default function Login() {

    // get the user and setUser from UserContext
    const { user, setUser } = useContext(UserContext);

    // set state for username, password and isComplete
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    // authenticate the user by consuming the /Account/SignIn API endpoint
    function authenticate(e) {

        // use preventDefault to prevent the page from refreshing/reloading
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
            
            /* if the fetched username is equal to the username from the user input,
            a success message will appear and redirect to the home page*/
            if (data.username === username) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Welcome back ${data.username}`,
                    showConfirmButton: false,
                    timer: 1500
                });
                // set the user properties on the UserContext based from the fetched data
                setUser({
                    username: data.username,
                    displayName: data.displayName
                });
                // set it also as an item in the localStorage
                localStorage.setItem('user', data.username);
                localStorage.setItem('displayName', data.displayName);
            
            // if username did not match, an error message will appear
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `Login failed`,
                    text: 'Invalid username or password',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });

        // reset the values of username and password
        setUsername('');
        setPassword('');
    }

    // this useEffect will check if all fields are filled
    useEffect(() => {
        // if all fields are filled, isComplete will be true
        if (username !== '' && password !== '') {
            setIsComplete(true);

        // else it will be set to false
        } else {
            setIsComplete(false);
        }
    
    // add username, password and isComplete as dependency
    },[username, password, isComplete]);

    // render the page
    return (
        // conditional rendering/routing for authenticated and non authenticated user
        ( user.username !== null && user.displayName !== null ) ?
            <Navigate to="/home/index" />
        :
            <>
                    <div className="login-background"></div>
                    <Container className="my-5 py-5">
                    <div className="d-flex justify-content-center align-items-center my-5 py-5 m-0">
                        <Form className="login-form p-5" onSubmit={e => authenticate(e)}>
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
                        
                            {/* conditional rendering is all fields are filled */}
                            { isComplete ? 
                                <Button variant="primary" type="submit" className="w-100">Login</Button>
                            :
                                <Button variant="primary" type="submit" className="w-100" disabled>Login</Button>
                            }
                        </Form>
                    </div>
                </Container>
            </> 
    )
}