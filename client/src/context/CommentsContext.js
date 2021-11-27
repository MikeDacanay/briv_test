import { createContext, useState } from 'react';
// import { PostsContext } from './PostsContext';
// import { reqAxios } from '../shared/axiosConfig';
// import { tryCatchHandlr } from '../shared/helpers';

export const CommentsContext = createContext({});

export const CommentsProvider =  ({children}) => {
    const [requestComments, setrequestComments] = useState(false)


    const initialValues = {
        requestComments,
        setrequestComments
    }

    return (
        <CommentsContext.Provider value={initialValues}>
            {children}
        </CommentsContext.Provider>
    )
}