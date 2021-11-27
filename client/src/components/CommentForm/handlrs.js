import { authAxios } from "../../shared/axiosConfig";
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

    const request = authAxios
        .post(
            '/comments',
            payload
        );

    const [createCommentData, createCommentError] = await tryCatchHandlr(request);
    
    setrequestComments(prev => !prev);
    
    return [createCommentData, createCommentError];
}