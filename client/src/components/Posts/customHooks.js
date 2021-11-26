import {useState, useEffect} from "react";
import { authAxios } from '../../shared/axiosConfig';
import { tryCatchHandlr } from "../../shared/helpers";
// import { payloader } from "../../shared/helpers";

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