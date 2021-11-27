import {useState, useEffect} from "react";
import { tryCatchHandlr } from "../shared/helpers";
import { reqAxios } from "../shared/axiosConfig";

export const useGetPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async function getPosts() {
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

// export const useGetComments = () => {
//     const [comments, setComments] = useState([]);

//     useEffect(() => {
//         (async function getPosts() {
//             const request = reqAxios.get('/posts');
//             const [{data}, error] = await tryCatchHandlr(request);

//             //TODO Handle posts if there are zero posts
//             if(data){
//                 setComments(data.posts);
//             }

//             //TODO Handle error by displaying html image
//             console.log(error);
//         })()
//     }, []);

//     return [comments, setComments];
// }