import React from "react";
import { PostForm } from "../../components/PostForm";
import { Posts } from "../../components/Posts";

export const Dashboard = props => {
  return (
    <div className="Dashboard">
      <PostForm/>
      <Posts/>
    </div>
  )
}; 