import React, { Component } from "react";

import CanvasDraw from "react-canvas-draw";
import classNames from "./canvas.css";
import { SketchPicker } from 'react-color';
import { Button } from "react-bootstrap";
import Box from "@material-ui/core/Box";

const sendRequest = (saveData) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify()
  };
  fetch(`http://localhost:5000/newpost?username=${localStorage.getItem("username")}&picture=${saveData}`, requestOptions)
    .then(response => response.json())
    .then(data => console.log(data));
}


class Canvas extends Component {
    state = {
        color: "#ffc600",
        width: 256,
        height: 256,
        brushRadius: 2,
        lazyRadius: 0
    };

    handleChangeComplete = (color) => {
        this.setState({ color: color.hex });
    };

    render() {
        return (
            <div>
            <div className={classNames.tools}>
          <Button
            onClick={() => {
              sendRequest(this.saveableCanvas.getSaveData());
            }}
          >
            Send Post
          </Button>
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
              onChange={e =>
                this.setState({ brushRadius: parseInt(e.target.value, 10) })
              }
            />
          </div>
        </div>
            <div className="rowColour">
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
        </div>
        <SketchPicker
            color={ this.state.color }
            onChangeComplete={ this.handleChangeComplete }
          />
        </div>
        </div>
        );
    }
}

export default Canvas