import React, { Component, useState, useEffect } from "react";
import "react-dropdown/style.css";
import Post from "./Post"
import NavBar from "../Components/NavBar";
import "./Feed.css";

const getPrivatePosts = async (username) => {
	const response = await fetch(`http://localhost:5000/getprivatepost?username=${username}`,
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


const PrivateFeed = () => {
	const [posts, setPosts] = useState([]);
	useEffect(async () =>
		setPosts(await getPrivatePosts(localStorage.getItem("username")))
		, []);
	return (
		<div className="bg-light">
			<NavBar />
			<div className="d-flex justify-content-center mt-4">
				<button className="btn bg-info text-white"
					onClick={async () => {
						setPosts(await getPrivatePosts(localStorage.getItem("username")));
					}}
				>
					Refresh
			</button>
			</div>
			{posts.map(post => <Post key={post.id} date={post.date} artist={post.username} pfp={JSON.parse(post.pfp)} picture={JSON.parse(post.picture)} />)}
		</div>
	);
}


export default PrivateFeed;
