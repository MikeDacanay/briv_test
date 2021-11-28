import React, { useContext} from "react";
import { Comment } from "../Comment";
import { CommentsContext } from "../../context/CommentsContext";
import { Button } from "../UI/Button";
export const Comments = ({post_id}) => {
    const {comments, setCommentsPage} = useContext(CommentsContext);
    const commentsPerPost = comments[post_id] === undefined ? [] : [...comments[post_id]];

    return (
        <div className="Comments" style={{'background': 'burlywood'}}>
            {!!commentsPerPost.length && commentsPerPost.map(comment => (
                <Comment key={comment._id} comment={comment} post_id={post_id}/>
            ))}
            <Button        
                clicked={() => setCommentsPage(prev => {
                    const tempPrev = {...prev};
                    tempPrev.changedPost = post_id;
                    tempPrev[post_id] = tempPrev[post_id] + 1;
                    return tempPrev; 
                })}
                style={{'margin': '0px auto', 'marginTop': '20px','display': 'block'}}>
                Load More Comments...
            </Button>
        </div>
    )
}; 