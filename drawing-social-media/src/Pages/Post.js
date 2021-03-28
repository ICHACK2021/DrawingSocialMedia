import React, { Component } from "react";

import CanvasDraw from "react-canvas-draw";
import Box from '@material-ui/core/Box';

class Post extends Component {
	componentDidMount(){
    	this.loadableCanvas.loadSaveData(	
              this.props.picture, true
            );
  	}

	render() {
		return (
			<Box border={1}>
				{console.log("a")}
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