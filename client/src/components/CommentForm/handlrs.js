import { authAxios } from "../../shared/axiosConfig";
// import axios from 'axios';
import { payloader, tryCatchHandlr } from "../../shared/helpers";


export const submitHandlr = async (e, post_id, isLoggedIn, setComments) => {
    e.preventDefault();

    const payload = {
        comment:{
            post_id,
            user_id: isLoggedIn,
            ...payloader(e)
        }
    };

    const token = window.localStorage.getItem('token');

    const request = authAxios
        .post(
            '/comments',
            payload,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
        );

    const [createCommentData, createCommentError] = await tryCatchHandlr(request);
    
    //TODO handle errors
    if(createCommentError){
        console.log(createCommentError);
        return createCommentError;
    }

    const {data: {comment}} = createCommentData;

    setComments(prev => {
        const tempObj = {...prev};
        const {post: {_id: postId}} = comment
        tempObj[postId] ? tempObj[postId].unshift(comment) : tempObj[postId] = [comment];              
        return tempObj;
    });

    return createCommentData;
}