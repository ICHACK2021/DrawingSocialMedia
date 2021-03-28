import React, { Component, useState, useEffect } from "react";
import "react-dropdown/style.css";
import Post from "./Post"
import Title from "../Components/Title";
import "./Feed.css";


const getPosts = async () => {
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

const _onSelect = (option, setter) => {
	setter(option.target.value === "Private Feed");
};


const Feed = () => {
	const [isPrivate, setPrivate] = useState(false);
	const [posts, setPosts] = useState([]);
	useEffect(async () =>
		setPosts(await getPosts())
		, []);
	return (
		<div className="bg-light">
			<Title />
			<select
				value={
					isPrivate ? "Private Feed" : "Public Feed"
				}
				onChange={(e) => _onSelect(e, setPrivate)}
			>
				<option value="Public Feed">Public Feed</option>
				<option value="Private Feed">Private Feed</option>
			</select>
			<button
				onClick={async () => {
					setPosts(await getPosts());
				}}
			>
				Refresh
			</button>
			{posts.map(post => <Post key={Math.floor(Math.random() * 10000)} artist={post.username} picture={JSON.parse(post.picture)} />)}
		</div>
	);
}


export default Feed;
