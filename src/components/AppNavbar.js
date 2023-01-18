// import built-in react modules
import { useContext } 		      from 'react';

// import UserContext
import UserContext 				  from '../UserContext';

// import downloaded packages
import { Container, Nav, Navbar}  from 'react-bootstrap';
import { NavLink }                from 'react-router-dom';

// export the function component so that it can be use anywhere
export default function AppNavbar() {

    // get user from UserContext
    const { user } = useContext(UserContext);

    // render the component
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                {/* Conditional rendering for authenticated and non authenticated user */}
                <Navbar.Brand href="#home">{ (user.username) ? `Hi ${user.displayName}!` : "Practical exercise"}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    {/* Conditional rendering for nav links for authenticated and non authenticated user */}
                    { user.username !== null && <Nav.Link as={NavLink} to="/home/index" className="mx-2">Home</Nav.Link>}
                    { user.username === null && <Nav.Link as={NavLink} to="/account/login" className="mx-2">Login</Nav.Link> }
                    { user.username !== null && <Nav.Link as={NavLink} to="/logout" className="mx-2">Logout</Nav.Link>}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}