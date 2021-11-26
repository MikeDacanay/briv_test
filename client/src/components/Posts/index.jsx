import React from "react";
import { Post } from "../Post";
import { useGetPosts } from "./customHooks";

export const Posts = props => {
    const [posts, setPosts] = useGetPosts();  

    return (
        <div className="Posts">
			{posts.length && posts.map(post => (<Post key={post._id} post={post}/>))}           
        </div>
    )
}; 