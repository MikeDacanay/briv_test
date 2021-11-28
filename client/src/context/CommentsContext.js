import moment from 'moment';
import { createContext, useState, useEffect } from 'react';
// import { PostsContext } from './PostsContext';
import { reqAxios } from '../shared/axiosConfig';
import { tryCatchHandlr } from '../shared/helpers';

export const CommentsContext = createContext({});

export const CommentsProvider =  ({children}) => {
    const [comments, setComments] = useState({});


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

                console.log(tempObj);


                //TODO FIX THIS SORTING NOT FUNCITONAL;
                for(const key in tempObj) {
                    tempObj[key].sort((a, b) => {
                        const momentValue = (formattedDate) => moment(formattedDate).valueOf();                        

                        return momentValue(a.createdAt) - momentValue(b.createdAt);
                    });
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