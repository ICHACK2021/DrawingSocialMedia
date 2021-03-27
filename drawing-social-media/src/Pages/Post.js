import React, { Component } from "react";
import { render } from "react-dom";

import CanvasDraw from "react-canvas-draw";
import Box from '@material-ui/core/Box';
import classNames from "./post.css";

class Post extends Component {
	componentDidMount(){
    	this.loadableCanvas.loadSaveData(	
              this.props.picture
            );
  	}
	render() {
		return (
			<Box border={1}>
				<div className="postBox">
					<p>Artist: {this.props.artist}</p>
					<CanvasDraw
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