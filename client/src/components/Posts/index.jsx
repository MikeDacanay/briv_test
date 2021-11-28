import React, { useContext } from "react";
import { Post } from "../Post";
import { PostsContext } from "../../context/PostsContext";
import { Button } from "../UI/Button";

export const Posts = () => {
 
    const postsContxt = useContext(PostsContext);
    const { setPage } = postsContxt;

    return (
        <>
            <div className="Posts">
                {postsContxt.posts.length && postsContxt.posts.map(post => (<Post key={post._id} post={post}/>))}           
            </div>
            <Button        
                clicked={() => setPage(prev => prev+1)}
                style={{'margin': '0px auto', 'marginTop': '20px','display': 'block'}}>
                Load More Posts...
            </Button>
        </>
    )
}; 