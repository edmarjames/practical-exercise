import { Container, Nav, Navbar}  from 'react-bootstrap';

import { NavLink }                  from 'react-router-dom';

import UserContext 						from '../UserContext';

import { useContext, useEffect } 		from 'react';

export default function AppNavbar() {

    const { user } = useContext(UserContext);

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">{ (user.username) ? `Hi ${user.displayName}!` : "Practical exercise"}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    { user.username && <Nav.Link as={NavLink} to="/home/index" className="mx-2">Home</Nav.Link>}
                    { user.username === null && <Nav.Link as={NavLink} to="/account/login" className="mx-2">Login</Nav.Link> }
                    { user.username && <Nav.Link as={NavLink} to="/logout" className="mx-2">Logout</Nav.Link>}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}