import { authAxios } from "../../shared/axiosConfig";
import { tryCatchHandlr } from "../../shared/helpers";


export const deletePostHandlr = async (id) => {
    const request = authAxios
        .delete(
            `/posts/${id}`,
        );

    const [data, error] = await tryCatchHandlr(request);

    console.log(data, error);
}

export const toggleEditHandlr = (e, seteditablepost) => {
    e.preventDefault();
    seteditablepost(prev => {
        if(prev === 'open') return true;
    
        return !prev
    });
}