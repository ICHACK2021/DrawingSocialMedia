import React, { Component } from "react";
import { render } from "react-dom";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

class Feed extends Component {
	getSaveData = (id) => {};

	getPosts = () => {
		var elements = [];
		fetch(`http://localhost:5000/getpost`,
		{
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify()
		}).then(response => response.json())
		.then(data => console.log(data));
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
