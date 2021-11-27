import {useState, useEffect} from "react";
import { tryCatchHandlr } from "../shared/helpers";
import { reqAxios } from "../shared/axiosConfig";

export const useGetPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async function () {
            const request = reqAxios.get('/posts');
            const [{data}, error] = await tryCatchHandlr(request);

            //TODO Handle posts if there are zero posts
            if(data){
                setPosts(data.posts);
            }

            //TODO Handle error by displaying html image
            return error;
        })()
    }, []);

    return [posts, setPosts];
}