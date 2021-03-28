import React, { Component } from "react";
import "react-dropdown/style.css";
import Post from "./Post"

class Feed extends Component {
	getSaveData = (id) => { };


	getPosts = async () => {
		const response = await fetch(`http://localhost:5000/getpost`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify()
			});

		const data = await response.json();
		//For post in feed, add <Post saveData=getSaveData/> to elements
		// console.log(elements)
		return data.posts;
	};

	_onSelect = (option) => {
		this.setState({ isPrivate: option.target.value === "Private Feed" });
	};

	state = {
		isPrivate: false,
		posts: [],
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
					onClick={async () => {
						this.setState({ posts: await this.getPosts() });
					}}
				>
					Refresh
				</button>
				{this.state.posts.map(post => <Post key={Math.floor(Math.random() * 10000)} artist={post.username} picture={JSON.parse(post.picture)} />)}
			</div>
		);
	}
}

export default Feed;
