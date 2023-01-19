// import downloaded packages
import { Container, Button } 	from 'react-bootstrap';
import { Link } 				from 'react-router-dom';

// import gif from assets
import NotFound                 from '../assets/404 error with a tired person.gif';


// export the function so that it can be use anywhere
export default function ErrorPage() {
    return (
        <Container className="py-5">
            <div className="d-flex flex-column justify-content-center align-items-center error-page-container gap-2 mx-auto my-5 py-5">
                <img src={NotFound} alt="404_page_not_found" className="img-fluid"/>
                <h5>The page you are looking for cannot be found</h5>
                <Button as={Link} to="/" className="btn btn-primary">Return</Button>
            </div>
        </Container>
    )
}