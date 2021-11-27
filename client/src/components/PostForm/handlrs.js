import { authAxios, config } from "../../shared/axiosConfig";
// import axios from 'axios';
import { tryCatchHandlr, payloader, getPosts } from "../../shared/helpers";

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

    getPosts(setPosts);

    return [createPostData, createPostError];
};