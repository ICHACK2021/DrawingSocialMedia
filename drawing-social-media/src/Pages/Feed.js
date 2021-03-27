import React, { Component } from "react";
import { render } from "react-dom";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

class Feed extends Component {
	getSaveData = (id) => {};

	getPosts = () => {
		var elements = [];
		//For post in feed, add <Post saveData=getSaveData/> to elements
		return elements;
	};

	_onSelect = (option) => {
		this.setState({ isPrivate: option.target.value == "Private Feed" });
	};

	state = {
		isPrivate: false,
		posts: this.getPosts(),
	};

	render() {
		return (
			<div>
				<select
					value={
						this.state.isPrivate ? "Private Feed" : "Public Feed"
					}
					onChange={this._onSelect}
				>
					<option value="Public Feed">Public Feed</option>
					<option value="Private Feed">Private Feed</option>
				</select>
				<button
					onClick={() => {
						this.setState({ posts: this.getPosts() });
					}}
				>
					Refresh
				</button>
				{this.state.posts}
			</div>
		);
	}
}

export default Feed;
