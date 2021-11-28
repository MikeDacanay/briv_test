import { createContext, useState, useEffect } from 'react';
import { reqAxios } from '../shared/axiosConfig';
import { tryCatchHandlr } from '../shared/helpers';
import { querySorter } from '../shared/helpers';

export const CommentsContext = createContext({});

export const CommentsProvider =  ({children}) => {
    const [comments, setComments] = useState({});
    // const [page, setPage] = useState(0);


    useEffect(() => {
        (async() => {
            const getRequest = await reqAxios(
                `/comments`
            );

            const [{data: {comments}}, getCommentsError] = await tryCatchHandlr(getRequest);

            //TODO HANDLE ERROR SEND MEANINGFUL MESSAGE
            if(getCommentsError){
                console.log(getCommentsError);
                return getCommentsError;
            }

            //TODO DEPRECATE THIS ONCE AGGREGATED 
            setComments(prev => {
                const tempObj = {...prev};
                
                for(const comment of comments){ 
                    const {post: {_id: postId}} = comment;
                    tempObj[postId] === undefined ? tempObj[postId] = [comment] : tempObj[postId].unshift(comment);                     
                }
                for(const key in tempObj) {
                    querySorter(tempObj[key]);
                }

                return tempObj;
            });
        })()
    }, []);

    const initialValues = {
        comments,
        setComments
    }

    return (
        <CommentsContext.Provider value={initialValues}>
            {children}
        </CommentsContext.Provider>
    )
}