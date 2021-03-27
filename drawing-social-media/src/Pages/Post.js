import React, { Component } from "react";
import { render } from "react-dom";

import CanvasDraw from "react-canvas-draw";
import Box from "@material-ui/core/Box";
import classNames from "./post.css";

class Post extends Component {
	render() {
		return (
			<Box border={1}>
				<div className="postBox">
					<p>Artist: {this.props.artist}</p>
					<CanvasDraw
						disabled
						hideGrid
						saveData={this.props.saveData}
					/>
				</div>
			</Box>
		);
	}
}

export default Post;
