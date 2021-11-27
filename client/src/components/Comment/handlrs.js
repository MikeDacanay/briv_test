import { authAxios } from "../../shared/axiosConfig";
import { tryCatchHandlr } from "../../shared/helpers";

export const deleteCommentHandlr = async (post_id, setrequestComments) => {
    const request = authAxios
        .delete(
            `/comments/${post_id}`,
        );

    const [data, error] = await tryCatchHandlr(request);
 
    setrequestComments(prev => !prev);

    return [data, error];
}