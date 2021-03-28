import React, { Component, useState } from "react";

import CanvasDraw from "react-canvas-draw";
import Box from '@material-ui/core/Box';
import NavBar from "../Components/NavBar";
import "./Post.css";
import classNames from "./canvas.css";
import { Button } from "react-bootstrap";
import { SketchPicker } from "react-color";


class Post extends Component {
	state = {
		drawReaction: false,
		color: "000000",
		width: 512,
		height: 512,
		brushRadius: 2,
		lazyRadius: 0,
		picture: "",
	}

	componentDidMount() {
		this.loadableCanvas.loadSaveData(
			this.props.picture
		);
		this.loadableCanvas2.loadSaveData(
			this.props.pfp
		);
	}

	render() {
		return (
			<div>
				<div className="box">
					<div className="postBox bg-white">
						<div className="row">
							<div className="col-md-6">
								<div className="text h3 text-dark ml-2">Artist: {this.props.artist}</div>
								<div className="text h3 text-dark ml-2">Date: {this.props.date}</div>
							</div>
							<div className="col-md-6 d-flex justify-content-end">
								<div className="mr-2 mt-2"><CanvasDraw className="drawing"
									ref={canvasDraw => (this.loadableCanvas2 = canvasDraw)}
									disabled
									hideGrid
									canvasWidth={128}
									canvasHeight={128}
								/></div>
							</div>
						</div>
						<CanvasDraw className="drawing"
							ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
							disabled
							hideGrid
							canvasWidth={this.state.width}
							canvasHeight={this.state.height}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Post