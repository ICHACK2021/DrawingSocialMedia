import React, { useState, useRef, Component } from "react";
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

const handlingSubmit = (username, email, password, picture) => {
  // Need to change functionality of this!
  fetch(`http://localhost:5000/register?username=${username}&email=${email}&password=${password}&picture=${JSON.stringify(picture)}`, 
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify()
  }).then(response => response.json())
    .then(data => console.log(data)); // data.status if 0 success else failure
}


class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    color: "#ffc600",
    width: 400,
    height: 400,
    brushRadius: 10,
    lazyRadius: 0,
    picture: "",
  }

  handleChangeComplete = (color) => {
      this.setState({ color: color.hex });
  };

  render() {
  return (
    <div className="Login">
      <Form>

        <Form.Group size="lg" controlId="Username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={this.state.username}
            onChange={(e) => this.setState({ username: e.target.value})}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value})}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value})}
          />
        </Form.Group>
        <Button size="lg" onClick={() => handlingSubmit(this.state.username, this.state.email, this.state.password, this.state.picture)} disabled={!validateForm(this.state.username, this.state.email, this.state.password, this.state.picture)}>
          Signup
        </Button>
        <Link to="/login">
          <p/>
        <div>
            Login
        </div>
        </Link>
      </Form>
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
              value={this.state.brushRadius}
              onChange={e =>
                this.setState({ brushRadius: parseInt(e.target.value, 10) })
              }
            />
          </div>
        </div>
            <div className="rowColour">
            <div>
        <CanvasDraw
          ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
          brushColor={this.state.color}
          brushRadius={this.state.brushRadius}
          lazyRadius={this.state.lazyRadius}
          canvasWidth={this.state.width}
          canvasHeight={this.state.height}
          onChange={() => this.setState({picture: this.saveableCanvas.getSaveData()})}
        />
        </div>
        <SketchPicker
            color={ this.state.color }
            onChangeComplete={ this.handleChangeComplete }
          />
        </div>
        </div>
    </div>
  );
}
}


export default Signup;