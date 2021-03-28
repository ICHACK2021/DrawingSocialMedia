import React, { Component } from "react";

import CanvasDraw from "react-canvas-draw";
import Box from '@material-ui/core/Box';
import "./Post.css";

class Post extends Component {
	componentDidMount() {
		this.loadableCanvas.loadSaveData(
			this.props.picture
		);
	}

	render() {
		return (
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
		);
	}
}

export default Post