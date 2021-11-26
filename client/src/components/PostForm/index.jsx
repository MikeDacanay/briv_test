import React from "react";
import { Input } from "../UI/Input";
import { submitHandlr } from "./handlrs";
export const PostForm = props => {  

  return (
    <form onSubmit={(e) => submitHandlr(e)}>
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