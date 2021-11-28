import { useState, useEffect } from 'react';
import { reqAxios } from '../../shared/axiosConfig';
import { tryCatchHandlr } from '../../shared/helpers';

export const useCommentsOnInit = (post_id) => {
    const [comments, setcomments] = useState([]);

    useEffect(() => {
        (async() => {
            const getRequest = await reqAxios(
                `/comments/${post_id}`
            );

            const [{data: {comments}}, getCommentsError] = await tryCatchHandlr(getRequest);

            if(comments.length || !getCommentsError){
                setcomments(comments);
            }
        })()
    }, [post_id])

    return [comments, setcomments];
}