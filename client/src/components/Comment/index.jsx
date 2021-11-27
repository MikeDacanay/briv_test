import React, { useContext, useRef } from "react";
import { Button } from '../UI/Button';
import { AuthContext } from "../../context/AuthContext";
import { deleteCommentHandlr } from "./handlrs";
import { toggleEditHandlr } from "./helpers";
import { CommentsContext } from "../../context/CommentsContext";
import { UpdatableComment } from "./fractals";
import { useToggledEditComment } from './customHooks';

export const Comment = ({comment}) => {
    const {_id, contents, user:{display_name, _id: user_id}, createdAt} = comment;
    const { isLoggedIn } = useContext(AuthContext);
    const { setrequestComments } = useContext(CommentsContext);
    const containerRef = useRef(null);
    const [editablecomment, seteditablecomment] = useToggledEditComment(containerRef);

    return (
        <div className="Comment__container" style={{
            'border': '1px solid blue',
            'marginBottom': '10px'
        }}>    
            <form className="" id={_id} ref={containerRef} onSubmit={(e) => toggleEditHandlr(e, seteditablecomment)}>       
                {/* <div className="Comment__contents">{contents}</div> */}
                <UpdatableComment 
                    editablecomment={editablecomment}
                    contents={contents}/>
                <div className="Comment__user">Created By: {display_name} </div>
                <div className=""> Created On: {createdAt}</div>
                {isLoggedIn === user_id && (
                    <Button>
                        {!editablecomment || editablecomment === 'open' ? 'Edit Comment' : 'Update Comment'}
                    </Button>)
                }
            </form>
            {isLoggedIn === user_id && (
                <Button
                    clicked={() => deleteCommentHandlr(_id, setrequestComments)}>
                    Delete Comment
                </Button>)
            }    
        </div>
    )
}; 