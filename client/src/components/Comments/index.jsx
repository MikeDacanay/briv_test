import React, { useContext} from "react";
import { Comment } from "../Comment";
import { CommentsContext } from "../../context/CommentsContext";

export const Comments = ({post_id}) => {
    const {comments} = useContext(CommentsContext);
    const commentsPerPost = comments[post_id] === undefined ? [] : [...comments[post_id]];
    
    return (
        <div className="Comments">
            {!!commentsPerPost.length && commentsPerPost.map(comment => (
                <Comment key={comment._id} comment={comment} post_id={post_id}/>
            ))}
        </div>
    )
}; 