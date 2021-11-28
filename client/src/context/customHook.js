import {useState, useEffect} from "react";
import { tryCatchHandlr } from "../shared/helpers";
import { reqAxios } from "../shared/axiosConfig";
import { querySorter } from "../shared/helpers";

export const useGetPosts = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 5;

    useEffect(() => {
        (async function () {
            const request = reqAxios.get(`/posts?page=${page}`);
            const [{data: {posts}}, error] = await tryCatchHandlr(request);

            //TODO Handle posts if there are zero posts
            // console.log(posts);
            if(posts){
                querySorter(posts);
                setPosts(posts);
                return posts;
            }

            //TODO Handle error by displaying html image
            return error;
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(() => {
        if(page*limit < posts.length) {
            const request = reqAxios.get(`/posts?posts=${posts.length}`);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, setPosts])

    return {posts, setPosts, page, setPage};
}