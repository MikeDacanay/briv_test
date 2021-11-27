import React, { useContext} from "react";
import { Comment } from "../Comment";
import { useCommentsOnInit } from "./customHooks";
import { CommentsContext } from "../../context/CommentsContext";

export const Comments = ({post_id}) => {
    const {requestComments} = useContext(CommentsContext);
    const [comments] = useCommentsOnInit(post_id, requestComments);
    
    return (
        <div className="Comments">
            {comments.map(comment => (
                <Comment key={comment._id} comment={comment}/>
            ))}
        </div>
    )
}; 