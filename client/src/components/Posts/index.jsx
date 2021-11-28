import React, { useContext } from "react";
import { Post } from "../Post";
import { PostsContext } from "../../context/PostsContext";


export const Posts = () => {
 
    const postsContxt = useContext(PostsContext);

    return (
        <div className="Posts">
			{postsContxt.posts.length && postsContxt.posts.map(post => (<Post key={post._id} post={post}/>))}           
        </div>
    )
}; 