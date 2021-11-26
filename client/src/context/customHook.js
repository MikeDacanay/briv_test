import {useState, useEffect} from "react";
import { tryCatchHandlr } from "../shared/helpers";
import { authAxios } from "../shared/axiosConfig";

export const useGetPosts = (cb) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async function getPosts() {
            const request = authAxios.get('/posts');
            const [{data}, error] = await tryCatchHandlr(request);

            //TODO Handle posts if there are zero posts
            if(data){
                setPosts(data.posts);
            }

            //TODO Handle error by displaying html image
            console.log(error);
        })()
    }, []);

    return [posts, setPosts];
}