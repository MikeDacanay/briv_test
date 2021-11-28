import {useState, useEffect} from "react";
import { tryCatchHandlr } from "../shared/helpers";
import { reqAxios } from "../shared/axiosConfig";
import { querySorter } from "../shared/helpers";

export const useGetPosts = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 5;

    // useEffect(() => {
    //     const postsLength = posts.length; 

    //     (async function () {
    //         const request = reqAxios.get(`/posts?postsAmt=${postsLength}`);
    //         const [{data: {posts}}, error] = await tryCatchHandlr(request);

    //         if(posts){
    //             querySorter(posts);
    //             setPosts(posts);
    //             return posts;
    //         }

    //         //TODO Handle error by displaying html image
    //         return error;
    //     })()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    
    useEffect(() => {
        const postsLength = posts.length;
        
        // console.log(page*limit, postsLength)

        (async function(){
            if(page*limit > postsLength) {
                const request = reqAxios.get(`/posts?postsAmt=${postsLength}`);
    
                const [{data: {posts}}, error] = await tryCatchHandlr(request);

                if(posts){
                    querySorter(posts);

                    if(postsLength) {
                        setPosts(prev =>  prev.concat(posts));
                        return;
                    };
                    setPosts(posts);
                    return posts;
                }
    
                //TODO Handle error by displaying html image
                return error;
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, setPosts])

    return {posts, setPosts, page, setPage};
}