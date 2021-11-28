import { useState, useEffect } from 'react';
import { authAxios, config } from "../../shared/axiosConfig";
import { tryCatchHandlr, refPayloader, getPosts } from "../../shared/helpers";

export const useToggledEditPost = (ref, setPosts) => {
    const [editablepost, seteditablepost] = useState('open');
    
    useEffect(() => {                
        if(!editablepost) {
            (async function(){
                const {current: {id: postId}} = ref;

                const token = window.localStorage.getItem('token');

                const request = authAxios
                    .patch(
                        `/posts/${postId}`,
                        refPayloader(ref),
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                "Content-Type": "application/json",
                            }
                        }
                    );
                
                const [data, error] = await tryCatchHandlr(request);
                
                if(data){

                    const {data : { updatedAttrs : {postId, title, body}}} = data;

                    setPosts(prev => {
                        const tempArr = [...prev];

                        const postIdxToChange = tempArr.findIndex(post => post._id === postId);
                        tempArr[postIdxToChange].title = title;
                        tempArr[postIdxToChange].body = body;

                        return tempArr;
                    });

                    return data;
                }

                return error;
                //TODO HANDLE ERROR HERE
            })()            
        }
    }, [editablepost, ref, setPosts])
    
    return [editablepost, seteditablepost];
} 

export const useEditablePost = editablepost => {
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        if(!editablepost || editablepost === 'open'){
            setEditable(false)
        }else{
            setEditable(true)
        }
    }, [editablepost]);

    return [editable];
}