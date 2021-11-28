import React, { useRef, useContext } from 'react';
import { CommentForm } from '../CommentForm';
import { Comments } from '../Comments';
import { Button } from '../UI/Button';
import { UpdatablePost } from './fractals';
import { AuthContext } from '../../context/AuthContext';
import { useToggledEditPost } from './customHook';
import { deletePostHandlr, toggleEditHandlr } from './handlrs';
import { PostsContext } from '../../context/PostsContext';

export const Post = ({post}) => {   
    const { isLoggedIn } = useContext(AuthContext);
    const { setPosts } = useContext(PostsContext)
    const {_id, title, body, user: {display_name, _id: user_id}, createdAt } = post;
    const containerRef = useRef(null);
    const [editablepost, seteditablepost] = useToggledEditPost(containerRef, setPosts);

    return (
        <div className="Post__container" style={{'border': '1px solid black'}}>
            <form className="" ref={containerRef} id={_id} onSubmit={(e) => toggleEditHandlr(e, seteditablepost)}>
                <UpdatablePost
                    title={title}
                    body={body}
                    display_name={display_name}
                    createdAt={createdAt}
                    editablepost={editablepost}/>                        
                {isLoggedIn === user_id && (
                    <Button>
                        {!editablepost || editablepost === 'open' ? 'Edit Post' : 'Update Post'}
                    </Button>)
                }
            </form>        
            {isLoggedIn === user_id && (
                <Button
                    clicked={() => deletePostHandlr(_id, setPosts)}>
                    Delete Post
                </Button>)
            }    
            <CommentForm
                post_id={_id}/>
            <Comments
                post_id={_id}/>
        </div>
    )
}
