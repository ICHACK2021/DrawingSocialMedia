import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return 0 < username.length && username.length <= 20 && 0 < password.length && password.length <= 20;
  }

  function handleSubmit(event) {
    event.preventDefault();
    event.userName;
  }


  function handlingSubmit(userName, password) {
      
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