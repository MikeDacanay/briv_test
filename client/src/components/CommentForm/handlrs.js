import { authAxios, config } from "../../shared/axiosConfig";
// import axios from 'axios';
import { payloader, tryCatchHandlr } from "../../shared/helpers";


export const submitHandlr = async (e, post_id, isLoggedIn, setrequestComments) => {
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
    
    setrequestComments(prev => !prev);
    
    return [createCommentData, createCommentError];
}