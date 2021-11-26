import { useState, useEffect } from 'react';
import { authAxios } from "../../shared/axiosConfig";
import { tryCatchHandlr, refPayloader, payloader } from "../../shared/helpers";

export const useToggledEditPost = (ref) => {
    const [editablepost, seteditablepost] = useState('open');
    
    useEffect(() => {                
        if(!editablepost) {
            (async function(){
                const {current: {id: postId}} = ref;

                const request = authAxios
                    .patch(
                        `/posts/${postId}`,
                        refPayloader(ref)
                    );
                
                const [data, error] = await tryCatchHandlr(request);    

                console.log(data, error);
            })()            
        }
    }, [editablepost])
    
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