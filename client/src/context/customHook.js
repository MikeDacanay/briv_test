import {useState, useEffect} from "react";
import { tryCatchHandlr } from "../shared/helpers";
import { reqAxios } from "../shared/axiosConfig";
import { querySorter } from "../shared/helpers";

export const useGetPosts = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        (async function () {
            const request = reqAxios.get('/posts/');
            const [{data: {posts}}, error] = await tryCatchHandlr(request);

            //TODO Handle posts if there are zero posts

            if(posts){
                querySorter(posts);
                setPosts(posts);
                return posts;
            }

            //TODO Handle error by displaying html image
            return error;
        })()
    }, []);

    // return [posts, setPosts];

    return {posts, setPosts, page, setPage};
}