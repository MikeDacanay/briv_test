import { createContext, useState, useEffect } from 'react';
import { reqAxios } from '../shared/axiosConfig';
import { tryCatchHandlr } from '../shared/helpers';
import { querySorter } from '../shared/helpers';

export const CommentsContext = createContext({});

export const CommentsProvider =  ({children}) => {
    const [comments, setComments] = useState({});
    const [commentsPage, setCommentsPage] = useState({changedPost: null});
    const limit = 5;
    useEffect(() => {
        (async() => {
            const getRequest = await reqAxios(
                `/comments?commAmt=0`
            );

            const [{data: {comments}}, getCommentsError] = await tryCatchHandlr(getRequest);

            if(getCommentsError){
                console.log(getCommentsError);
                return getCommentsError;
            }
            setComments(prev => {
                const tempObj = {...prev};
                
                for(const comment of comments){ 
                    const {post: {_id: postId}} = comment;
                    tempObj[postId] === undefined ? tempObj[postId] = [comment] : tempObj[postId].unshift(comment);                     
                }
                for(const key in tempObj) {
                    querySorter(tempObj[key]);
                    tempObj[key].length = 5;

                    setCommentsPage(prev => {
                        const tempPrev = {...prev};                            
                        tempPrev[key] = 1;
                        return tempPrev;
                    });
                }

                return tempObj;
            });

        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const { changedPost } = commentsPage;
        const commentsLength = comments[changedPost] === undefined ? 0 : comments[changedPost].length;

        if(comments[changedPost] && limit*commentsPage[changedPost] > commentsLength){
            (async() => {
                const getRequest = await reqAxios(
                    `/comments/post/${changedPost}?commAmt=${commentsLength}`
                );
    
                const [{data: {comments}}, getCommentsError] = await tryCatchHandlr(getRequest);
    
                if(getCommentsError){
                    console.log(getCommentsError);
                    return getCommentsError;
                }

                querySorter(comments);

                if(commentsLength) {
                    setComments(prev =>  {
                        const tempPrev = {...prev};                    
                        tempPrev[changedPost] = tempPrev[changedPost].concat(comments);
                        return tempPrev;
                    });
                    return;
                };
            })()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commentsPage])

    const initialValues = {
        comments,
        setComments,
        setCommentsPage,
    }

    return (
        <CommentsContext.Provider value={initialValues}>
            {children}
        </CommentsContext.Provider>
    )
}