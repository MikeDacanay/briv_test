import { authAxios } from "../../shared/axiosConfig";
import { tryCatchHandlr } from "../../shared/helpers";
import { getPosts } from "../../shared/helpers";


export const deletePostHandlr = async (id, setPosts) => {
    const request = authAxios
        .delete(
            `/posts/${id}`,
        );

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