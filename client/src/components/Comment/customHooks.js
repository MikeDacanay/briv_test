import { useState, useEffect } from 'react';
import { authAxios, config } from "../../shared/axiosConfig";
// import axios from 'axios';
import { tryCatchHandlr, refPayloader } from "../../shared/helpers";

export const useToggledEditComment = (ref, setComment) => {
    const [editablecomment, seteditablecomment] = useState('open');

    useEffect(() => {                
        if(!editablecomment) {
            (async function(){
                const {current: {id: commentId}} = ref;
           
                // const request = axios
                //     .patch(
                //         `/comments/${commentId}`,
                //         {...refPayloader(ref)},
                //         {headers: {
                //             'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
                //             "Content-Type": "application/json",
                //         }},
                //     );

                const token = window.localStorage.getItem('token');

                const request = authAxios
                    .patch(
                        `/comments/${commentId}`,
                        refPayloader(ref),
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                "Content-Type": "application/json",
                            }
                        }
                    );
                
                const [data, error] = await tryCatchHandlr(request);
                
                
                return [data, error];

                // getPosts(setComment);
            })()            
        }
    }, [editablecomment, ref])
    
    return [editablecomment, seteditablecomment];
} 

export const useEditableComment = editablecomment => {
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        if(!editablecomment || editablecomment === 'open'){
            setEditable(false)
        }else{
            setEditable(true)
        }
    }, [editablecomment]);

    return [editable];
}