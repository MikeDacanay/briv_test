import React, { useRef, useContext } from 'react';
// import { Input } from '../UI/Input';
import { Button } from '../UI/Button';
import { UpdatablePost } from './fractals';
import { AuthContext } from '../../context/AuthContext';
import { useToggledEditPost } from './customHook';
import { deletePostHandlr, toggleEditHandlr } from './handlrs';

export const Post = ({post}) => {   
    const { isLoggedIn } = useContext(AuthContext);
    const {_id, title, body, user: {display_name}, createdAt } = post;
    const containerRef = useRef(null);
    const [editablepost, seteditablepost] = useToggledEditPost(containerRef);

    return (
        <div className="Post__container" style={{'border': '1px solid black'}}>
            <form className="" ref={containerRef} id={_id} onSubmit={(e) => toggleEditHandlr(e, seteditablepost)}>
                <UpdatablePost
                    title={title}
                    body={body}
                    display_name={display_name}
                    createdAt={createdAt}
                    editablepost={editablepost}/>                        
                {isLoggedIn === display_name && (
                    <Button>
                        {/* // clicked={() => toggleEditHandlr(seteditablepost)}> */}
                        {!editablepost || editablepost === 'open' ? 'Edit' : 'Update'}
                    </Button>)
                }
            </form>        
            {isLoggedIn === display_name && (
                <Button
                    clicked={() => deletePostHandlr(_id)}>
                    Delete
                </Button>)
            }    
        </div>
    )
}
