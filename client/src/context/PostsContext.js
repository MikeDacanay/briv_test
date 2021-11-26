import { createContext } from 'react';
import { useGetPosts } from './customHook';

export const PostsContext = createContext({});

export const PostsProvider = ({children}) => {
    const [posts, setPosts] = useGetPosts();  

    const initialValues = {
        posts, 
        setPosts
    }

    return (
        <PostsContext.Provider value={initialValues}>
            {children}
        </PostsContext.Provider>
    )
}