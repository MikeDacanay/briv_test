import { createContext } from 'react';
import { useGetPosts } from './customHook';

export const PostsContext = createContext({});

export const PostsProvider = ({children}) => {
    const {posts, setPosts, page, setPage} = useGetPosts();  

    const initialValues = {
        posts, 
        setPosts,
        page, 
        setPage
    }

    return (
        <PostsContext.Provider value={initialValues}>
            {children}
        </PostsContext.Provider>
    )
}