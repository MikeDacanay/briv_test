import React, { useContext } from "react";
import { Post } from "../Post";
import { PostsContext } from "../../context/PostsContext";
import { Button } from "../UI/Button";
import { loadMorePostsHanldr } from "./handlrs";

export const Posts = () => {
 
    const postsContxt = useContext(PostsContext);
    const { setPage } = postsContxt;

    return (
        <>
            <div className="Posts">
                {postsContxt.posts.length && postsContxt.posts.map(post => (<Post key={post._id} post={post}/>))}           
            </div>
            <Button        
                clicked={() => loadMorePostsHanldr(setPage)}
                style={{'margin': '0px auto', 'marginTop': '20px','display': 'block'}}>
                Load More...
            </Button>
        </>
    )
}; 