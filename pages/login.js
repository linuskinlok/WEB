import { useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";

import { userAtom, favouritesAtom, searchHistoryAtom } from "../store";
import { getFavourites, getHistory } from "../lib/UserData";
import { authenticateUser } from "../lib/authenticate";
import { Card, Form, Button, Alert } from "react-bootstrap";

export default function Login() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);


  async function updateAtoms() {
    setFavourites(await getFavourites());
    setSearchHistory(await getHistory());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = await authenticateUser(userName, password);
      await updateAtoms();
      setUser(user);
      router.push("/favourites");
    } catch (error) {
      setWarning(error.message);
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
        <Card className="container">
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {warning && <Alert variant="danger">{warning}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="user">
                <Form.Label>User</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Enter your username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>&nbsp;
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>&nbsp;
              <Button variant="danger" className="w-100" type="submit">
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <a href="/register">Register</a>
        </div>
        </div>
      </div>
    </div>
  );
}
