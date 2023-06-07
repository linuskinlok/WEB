import { useState } from "react";
import { useRouter } from "next/router";
import { registerUser } from "../lib/authenticate";
import { Form, Button, Card, Alert } from "react-bootstrap";

export default function Register() {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (password !== password2) {
        setError("Passwords do not match");
        return;
        }
    
        try {
        await registerUser(user, password, password2);
        router.push("/login");
        } catch (error) {
        setError(error.message);
        }
    };
    
    return (
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6"><br />
            <Card>
                <Card.Body>
                <h2 className="text-center mb-4">Register</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="user">
                    <Form.Label>User</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        value={user}
                        placeholder="Enter your username"
                        onChange={(e) => setUser(e.target.value)}
                    />
                    </Form.Group>&nbsp;
                    <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        required
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </Form.Group>&nbsp;
                    <Form.Group id="password2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        required
                        value={password2}
                        placeholder="Confirm Password"
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                    </Form.Group>&nbsp;
                    <Button variant="danger" className="w-100" type="submit">
                    Register
                    </Button>
                </Form>
                </Card.Body>
            </Card>
            </div>
        </div>
        </div>
    );
    }
