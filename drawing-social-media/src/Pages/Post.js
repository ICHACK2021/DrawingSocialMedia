import React, { Component, useState } from "react";

import CanvasDraw from "react-canvas-draw";
import Box from '@material-ui/core/Box';
import "./Post.css";
import classNames from "./canvas.css";
import { Button } from "react-bootstrap";
import { SketchPicker } from "react-color";


class Post extends Component {
	state = {
		drawReaction: false,
		color: "000000",
		width: 32,
		height: 32,
		brushRadius: 2,
		lazyRadius: 0,
		picture: "",
	}

	componentDidMount() {
		this.loadableCanvas.loadSaveData(
			this.props.picture
		);
	}

	render() {
		return (
			<div>
				<Box border={1}>
					<div className="postBox bg-white">
						<div className="text h3 text-dark">Artist: {this.props.artist}</div>
						<div className="text h3 text-dark">Date: {this.props.date}</div>
						<CanvasDraw className="drawing"
							ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
							disabled
							hideGrid
						/>
					</div>
				</Box>
				<button className="addReaction">
					+
        		</button>
				{this.state.drawReaction && (
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
		);
	}
}

export default Post