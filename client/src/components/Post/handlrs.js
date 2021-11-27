import { authAxios, config } from "../../shared/axiosConfig";
// import axios from 'axios';
import { tryCatchHandlr } from "../../shared/helpers";
import { getPosts } from "../../shared/helpers";


export const deletePostHandlr = async (id, setPosts) => {
    const token = window.localStorage.getItem('token');

    const request = authAxios
        .delete(
            `/posts/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
        );

    // const request = axios
    //     .delete(
    //         `/posts/${id}`,
    //         {headers: {
    //             'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
    //             "Content-Type": "application/json",
    //         }},
    //     );

    const [data, error] = await tryCatchHandlr(request);
    console.log(data, error);

    getPosts(setPosts);
}

export const toggleEditHandlr = (e, seteditablepost) => {
    e.preventDefault();
    seteditablepost(prev => {
        if(prev === 'open') return true;
    
        return !prev
    });
}