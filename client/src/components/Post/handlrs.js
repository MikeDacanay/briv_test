import { authAxios } from "../../shared/axiosConfig";
import { tryCatchHandlr } from "../../shared/helpers";

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

    const [data, error] = await tryCatchHandlr(request);

    if(data){
        setPosts(prev => {
            const tempPosts = [...prev];
            const postIdxToDelete = tempPosts.findIndex(post => post._id === id);
            tempPosts.splice(postIdxToDelete, 1);
            return tempPosts;
        });

        return data;
    }

    //TODO HANDLE ERROR WITH MESSAGE
    return error;
    // getPosts(setPosts);
}

export const toggleEditHandlr = (e, seteditablepost) => {
    e.preventDefault();
    seteditablepost(prev => {
        if(prev === 'open') return true;
    
        return !prev
    });
}