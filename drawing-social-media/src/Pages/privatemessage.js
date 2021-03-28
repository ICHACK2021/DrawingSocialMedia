import React, { Component } from "react";

import CanvasDraw from "react-canvas-draw";
import classNames from "./canvas.css";
import NavBar from "../Components/NavBar";
import { AlphaPicker, SketchPicker } from 'react-color';
import { Button } from "react-bootstrap";
import Box from "@material-ui/core/Box";

const sendRequest = (saveData, sendTo) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(saveData)
  };
  fetch(`http://localhost:5000/privatemessage?username=${localStorage.getItem("username")}&to=${sendTo}`, requestOptions)
    .then(response => response.json())
    .then(data => {
      if (data["status"] === 0) {
        alert("Success");
      }
      else {
        alert(data["message"]);
      }
    });
}


class Privatemessage extends Component {
  state = {
    color: "#ffc600",
    width: 512,
    height: 512,
    brushRadius: 4,
    lazyRadius: 0,
    sendTo: ""
  };

  handleChangeComplete = (color) => {
    this.setState({ color: color.hex });
  };

  render() {
    return (
      <div className="bg-light full">
        <NavBar />
        <div className="d-flex justify-content-center mt-4">
        <label className="text h4 mt-3">Send To:</label>
          <input className="ml-2 mt-2"
            type="text"
            value={this.state.sendTo}
            onChange={e =>
              this.setState({ sendTo: e.target.value })
            }
          />
          <label className="text h4 mt-3">Brush-Radius:</label>
          <input className="ml-2 mt-2"
            type="number"
            value={this.state.brushRadius}
            onChange={e =>
              this.setState({ brushRadius: parseInt(e.target.value, 10) })
            }
          />

        </div>
        <div className="rowColour d-flex justify-content-center">
          <div>
            <Box border={1}>
              <CanvasDraw
                ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                brushColor={this.state.color}
                brushRadius={this.state.brushRadius}
                lazyRadius={this.state.lazyRadius}
                canvasWidth={this.state.width}
                canvasHeight={this.state.height}
              />
            </Box>
            <div className="d-flex justify-content-between">
              <Button className="ml-4 mr-4 mt-2"
                onClick={() => {
                  sendRequest(this.saveableCanvas.getSaveData(), this.state.sendTo);
                }}
              >
                Send Post
          </Button>
              <Button className="ml-4 mr-4 mt-2"
                onClick={() => {
                  this.saveableCanvas.clear();
                }}
              >
                Clear
          </Button>
              <Button className="ml-4 mr-4 mt-2"
                onClick={() => {
                  this.saveableCanvas.undo();
                }}
              >
                Undo
          </Button>
            </div>
          </div>
          <SketchPicker className="ml-4 mt-3"
            color={this.state.color}
            onChangeComplete={this.handleChangeComplete}
          />
        </div>
      </div>
    );
  }
}

export default Privatemessage