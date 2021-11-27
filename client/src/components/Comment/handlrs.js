import { authAxios, config } from "../../shared/axiosConfig";
// import axios from "axios";
import { tryCatchHandlr } from "../../shared/helpers";

export const deleteCommentHandlr = async (post_id, setrequestComments) => {
    // const request = axios.delete(
    //         `/comments/${post_id}`,
    //         {headers: {
    //             'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
    //             "Content-Type": "application/json",
    //         }},
    //     );
    const token = window.localStorage.getItem('token');

    const request = authAxios
        .delete(
            `/comments/${post_id}`,
            config,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
        );

    const [data, error] = await tryCatchHandlr(request);
 
    setrequestComments(prev => !prev);

    return [data, error];
}