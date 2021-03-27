import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import "./Login.css";
import CanvasDraw from "react-canvas-draw";
import { SketchPicker } from "react-color";
import classNames from "./canvas.css";
import Title from "../Components/Title";
import Box from "@material-ui/core/Box";

const validateForm = (username, password) => {
  return (
    0 < username.length &&
    username.length <= 20 &&
    0 < password.length &&
    password.length <= 20
  );
};

const validateRegister = (
  username,
  email,
  confirmEmail,
  password,
  confirmPassword
) => {
  let validRegex = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);
  return (
    0 < username.length &&
    username.length <= 20 &&
    0 < password.length &&
    password.length <= 20 &&
    validRegex.test(email) &&
    email === confirmEmail &&
    password === confirmPassword
  );
};

const handlingSubmit = (username, password) => {
  fetch(
    `http://localhost:5000/login?username=${username}&password=${password}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 0) {
        localStorage["username"] = username;
        window.location.href = "/canvas";
      } else {
        alert(data["message"]);
      }
    });
};

class Login extends Component {
  state = {
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
    emailConfirm: "",
    register: false,
    color: "#ffc600",
    width: 128,
    height: 128,
    brushRadius: 2,
    lazyRadius: 0,
    picture: "",
  };

  handleChangeComplete = (color) => {
    this.setState({ color: color.hex });
  };

  render() {
    return (
      <div>
        <div>
          <Title />
        </div>
        <div className="Login">
          <Form>
            <Form.Group size="lg" controlId="Username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                autoFocus
                type="username"
                value={this.state.username}
                onChange={(e) => this.setState({ username: e.target.value })}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </Form.Group>
            {this.state.register && (
              <div>
                <Form.Group size="lg" controlId="passwordConfirm">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={this.state.passwordConfirm}
                    onChange={(e) =>
                      this.setState({ passwordConfirm: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group size="lg" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </Form.Group>
                <Form.Group size="lg" controlId="emailConfirm">
                  <Form.Label>Confirm Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={this.state.confirmEmail}
                    onChange={(e) =>
                      this.setState({ confirmEmail: e.target.value })
                    }
                  />
                </Form.Group>
              </div>
            )}
            {!this.state.register && (
              <Button
                className="float-left bg-secondary"
                size="lg"
                onClick={() =>
                  this.setState({ register: !this.state.register })
                }
              >
                Sign Up
              </Button>
            )}
            {this.state.register && (
              <Button
                className="float-left"
                size="lg"
                onClick={() =>
                  handlingSubmit(
                    this.state.username,
                    this.state.email,
                    this.state.emailConfirm,
                    this.state.password,
                    this.state.passwordConfirm
                  )
                }
                disabled={
                  !validateForm(
                    this.state.username,
                    this.state.email,
                    this.state.emailConfirm,
                    this.state.password,
                    this.state.passwordConfirm
                  )
                }
              >
                Register
              </Button>
            )}
            <Button
              className="float-right bg-success"
              size="lg"
              onClick={() =>
                handlingSubmit(this.state.username, this.state.password)
              }
              disabled={!validateForm(this.state.username, this.state.password)}
            >
              Login
            </Button>
          </Form>
          +{" "}
          {this.state.register && (
            <div>
              <div className={classNames.tools}>
                <Button
                  onClick={() => {
                    this.saveableCanvas.clear();
                  }}
                >
                  Clear
                </Button>
                <Button
                  onClick={() => {
                    this.saveableCanvas.undo();
                  }}
                >
                  Undo
                </Button>
                <div>
                  <label>Brush-Radius:</label>
                  <input
                    type="number"
                    value={this.state.brushRadius}
                    onChange={(e) =>
                      this.setState({
                        brushRadius: parseInt(e.target.value, 10),
                      })
                    }
                  />
                </div>
              </div>
              <div className="rowColour">
                <div>
                  <Box border={1}>
                    <CanvasDraw
                      ref={(canvasDraw) => (this.saveableCanvas = canvasDraw)}
                      brushColor={this.state.color}
                      brushRadius={this.state.brushRadius}
                      lazyRadius={this.state.lazyRadius}
                      canvasWidth={this.state.width}
                      canvasHeight={this.state.height}
                      onChange={() =>
                        this.setState({
                          picture: this.saveableCanvas.getSaveData(),
                        })
                      }
                    />
                  </Box>
                </div>
                <SketchPicker
                  color={this.state.color}
                  onChangeComplete={this.handleChangeComplete}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Login;
