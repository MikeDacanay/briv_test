import React, { useContext } from "react";
import { Post } from "../Post";
import { PostsContext } from "../../context/PostsContext";


export const Posts = () => {
 
    const {posts} = useContext(PostsContext);

    return (
        <div className="Posts">
			{posts.length && posts.map(post => (<Post key={post._id} post={post}/>))}           
        </div>
    )
}; 