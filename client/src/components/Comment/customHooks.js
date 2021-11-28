import { useState, useEffect } from 'react';
import { authAxios } from "../../shared/axiosConfig";
// import axios from 'axios';
import { tryCatchHandlr, refPayloader } from "../../shared/helpers";

export const useToggledEditComment = (ref, postId, setComments) => {
    const [editablecomment, seteditablecomment] = useState('open');

    useEffect(() => {                
        if(!editablecomment) {
            (async function(){
                const {current: {id: commentId}} = ref;

                const token = window.localStorage.getItem('token');
                const payload = refPayloader(ref);
                const request = authAxios
                    .patch(
                        `/comments/${commentId}`,
                        payload,
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                "Content-Type": "application/json",
                            }
                        }
                    );
                
                const [data, error] = await tryCatchHandlr(request);
                
                //TODO HANDLE ERROR MESGAGES
                if(error){
                    console.log(error);
                    return error;
                }
                
                console.log(payload, commentId, postId);
                setComments(prev => {
                    const tempObj = {...prev};

                    const commentIdxToUpdate = tempObj[postId].findIndex(comment => comment._id === commentId);
                    
                    tempObj[postId][commentIdxToUpdate].contents = payload.contents;

                    return prev;
                });

                return data;
            })()            
        }
    }, [editablecomment, ref, postId, setComments])
    
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