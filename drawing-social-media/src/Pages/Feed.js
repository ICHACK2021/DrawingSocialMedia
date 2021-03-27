import React, { Component } from "react";
import { render } from "react-dom";

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class Feed extends Component {
	getSaveData = (id) => {

    }; 

	getPosts = () => {
		var elements = [];
		//For post in feed, add <Post saveData=getSaveData/> to elements
		return elements;
	}

    _onSelect = (option) => {
	    this.setState({isPrivate: option == 'Private Feed'})
	 };


	state = {
        isPrivate: false,
        posts: getPosts(),
    };
    
	render() {
		return (
			<div>
				<Dropdown options={['Public Feed', 'Private Feed']} onChange={this._onSelect} value={'Public Feed'}/>
				<button
		            onClick={() => {
		              this.setState({posts: getPosts()});
		            }}
		          >
		            Refresh
		        </button>
		        {this.state.posts}
			</div>
		);
	}
}

export default Feed