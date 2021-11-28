import { authAxios } from "../../shared/axiosConfig";
// import axios from 'axios';
import { tryCatchHandlr, payloader } from "../../shared/helpers";

export const submitHandlr = async(e, setPosts) => {
    e.preventDefault();
    const token = window.localStorage.getItem('token');

    const request = authAxios
        .post(
            '/posts',
            payloader(e),
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
        );

    const [createPostData, createPostError] = await tryCatchHandlr(request);

    if(createPostData){
        const {data: {post}} = createPostData;
        setPosts(prev => {
            const tempPosts = [...prev];
            tempPosts.unshift(post);
            return tempPosts;
        });
    }

    return [createPostData, createPostError];
};