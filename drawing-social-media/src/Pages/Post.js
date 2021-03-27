import React, { Component } from "react";
import { render } from "react-dom";

import CanvasDraw from "react-canvas-draw";

class Post extends Component {
	render() {
		return (
			<CanvasDraw
	          disabled
	          hideGrid
	          saveData={this.props.saveData}
	        />
		);
	}
}

export default Post