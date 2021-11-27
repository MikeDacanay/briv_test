import React, { useContext } from "react";
import { Input } from "../UI/Input";
import { submitHandlr } from "./handlrs";
import { AuthContext } from "../../context/AuthContext";
import { CommentsContext } from "../../context/CommentsContext";

export const CommentForm = ({post_id}) => {
    const { isLoggedIn } = useContext(AuthContext);
    const { setrequestComments } = useContext(CommentsContext);
    return (
        <form action="" onSubmit={(e) => submitHandlr(e, post_id, isLoggedIn, setrequestComments)}>
            <Input
                name="contents"
                label="Comment:"
                type="textarea"
                variant='textarea-0'
                required
                placeholder='Enter Comment Here'/>
            <Input
                type='submit'
                value='Create Comment'/>   
        </form>
    )
}; 