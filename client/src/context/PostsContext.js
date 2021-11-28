import { createContext, useEffect} from 'react';
import { useGetPosts } from './customHook';

export const PostsContext = createContext({});

export const PostsProvider = ({children}) => {
    const [posts, setPosts] = useGetPosts();  

    const initialValues = {
        posts, 
        setPosts
    }


    useEffect(() => {
        console.log(posts);
    }, [posts])

    return (
        <PostsContext.Provider value={initialValues}>
            {children}
        </PostsContext.Provider>
    )
}