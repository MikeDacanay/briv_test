import { authAxios, config } from "../../shared/axiosConfig";
// import axios from "axios";
import { tryCatchHandlr } from "../../shared/helpers";

export const deleteCommentHandlr = async (post_id ,comment_id, setComments) => {
    const token = window.localStorage.getItem('token');

    const request = authAxios
        .delete(
            `comments/${comment_id}`,
            config,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }
        );

    const [data, error] = await tryCatchHandlr(request);
 
    // TODO HANDLE ERROR WITH MESSAGE
    if(error) { 
        console.log(error);
        return error;
    }

    setComments(prev => {
        const tempObj = {...prev};

        const commentIdxToDelete = tempObj[post_id].findIndex(comment => comment._id === comment_id);

        tempObj[post_id].splice(commentIdxToDelete, 1);

        return tempObj;
    });

    return data;
}