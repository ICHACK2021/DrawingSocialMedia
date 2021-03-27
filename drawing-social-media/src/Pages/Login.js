import React, { useState } from "react";
import  { Button, Form }  from "react-bootstrap";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    return 0 < username.length && username.length <= 20 && 0 < password.length && password.length <= 20;
  }

  const handlingSubmit = (username, password) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify()
    };
    fetch(`http://localhost:5000/login?username=${username}&password=${password}`, requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));

  }
  

  return (
    <div className="Login">
      <Form onSubmit={handlingSubmit(username, password)}>
        <Form.Group size="lg" controlId="Username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}