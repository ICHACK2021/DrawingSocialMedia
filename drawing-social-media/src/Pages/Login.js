import React, { useState } from "react";
import  {Button, Form }  from "react-bootstrap";
import {Link} from "react-router-dom";
import "./Login.css";
import 'bootstrap/dist/css/bootstrap.min.css'

const validateForm = (username, password) => {
  return 0 < username.length && username.length <= 20 && 0 < password.length && password.length <= 20;
}

const handlingSubmit = (username, password) => {
  console.trace();
  fetch(`http://localhost:5000/login?username=${username}&password=${password}`, 
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify()
  }).then(response => response.json())
    .then(data => console.log(data)); // data.status if 0 success else failure
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="Login">
      <Form>
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
        <Button size="lg" onClick={() => handlingSubmit(username, password)} disabled={!validateForm(username, password)}>
          Login
        </Button>
        <Link to="/signup">
          <p/>
        <Button>
            Signup
        </Button>
        </Link>
      </Form>
    </div>
  );
}

export default Login;