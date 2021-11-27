import { authAxios } from "../../shared/axiosConfig";
import { tryCatchHandlr, payloader, getPosts } from "../../shared/helpers";

export const submitHandlr = async(e, setPosts) => {
    e.preventDefault();

    const request = authAxios
        .post(
            '/posts',
            payloader(e)
        );

    const [createPostData, createPostError] = await tryCatchHandlr(request);
    console.log(createPostData, createPostError);
    //TODO show either success/error handling after create 

    getPosts(setPosts);
};