import React, { useState, useRef } from "react";
import  {Button, Form }  from "react-bootstrap";
import {Link} from "react-router-dom";
import "./Signup.css";
import CanvasDraw from "react-canvas-draw";
import { SketchPicker } from 'react-color';
import classNames from "./canvas.css";

const validateForm = (username, email, password) => {
    let validRegex = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g)
  return 0 < username.length && username.length <= 20 && 0 < password.length && password.length <= 20 && validRegex.test(email);
}

const handlingSubmit = (username, email, password) => {
    // Need to change functionality of this!
  console.trace();
  fetch(`http://localhost:5000/login?username=${username}&password=${password}`, 
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify()
  }).then(response => response.json())
    .then(data => console.log(data)); // data.status if 0 success else failure
}


const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("#ffc600");
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(400);
  const [brushRadius, setBrushRadius] = useState(10);
  const canvas = useRef(null);

  const handleChangeComplete = (color) => {
        setColor(color);
  };

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

        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div>
            <div className={classNames.tools}>
          <button
            onClick={() => {
              this.saveableCanvas.clear();
            }}
          >
            Clear
          </button>
          <button
            onClick={() => {
              this.saveableCanvas.undo();
            }}
          >
            Undo
          </button>
          <div>
            <label>Brush-Radius:</label>
            <input
              type="number"
              value={brushRadius}
              onChange={e =>
                setBrushRadius(parseInt(e.target.value, 10))
              }
            />
          </div>
        </div>
            <div className="rowColour">
            <div>
        <CanvasDraw
          ref={canvas}
          brushColor={color}
          brushRadius={brushRadius}
          lazyRadius={0}
          canvasWidth={width}
          canvasHeight={height}
        />
        </div>
        <SketchPicker
            color={ color }
            onChangeComplete={ handleChangeComplete }
          />
        </div>
        </div>
        <Button size="lg" onClick={() => handlingSubmit(username, email, password)} disabled={!validateForm(username, email, password)}>
          Signup
        </Button>
        <Link to="/login">
          <p/>
        <div>
            Login
        </div>
        </Link>
      </Form>
    </div>
  );
}

export default Signup;