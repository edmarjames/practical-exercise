import { Button, Form, Container }  from "react-bootstrap";

export default function LoginForm() {
  return (
    <Container className="my-5 py-5">
        <div className="d-flex justify-content-center align-items-center w-50 mx-auto my-5 py-5 m-0 border">
            <Form className="w-50">
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
            
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    </Container>
  );
}
