import React, { useContext } from "react";
import { Input } from "../UI/Input";
import { submitHandlr } from "./handlrs";
import { PostsContext } from "../../context/PostsContext";

export const PostForm = props => {  
  const {setPosts} = useContext(PostsContext);
  return (
    <form onSubmit={(e) => submitHandlr(e, setPosts)}>
      <Input
        name="title"
        label="Title"
        type="text"
        required
        placeholder='Enter Title Here'/>  
      <Input
        name="body"
        label="Post"
        type="textarea"
        variant='textarea-0'
        required
        placeholder='Enter Post Here'
        />
      <Input
        type='submit'
        value='Create Post'/>   
    </form>
  )
}; 