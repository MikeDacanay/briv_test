import React from "react";
import { PostForm } from "../../components/PostForm";
import { Posts } from "../../components/Posts";
import { Logout } from "../../components/Logout";

export const Dashboard = props => {
  return (
    <div className="Dashboard">
      <Logout/>
      <PostForm/>
      <Posts/>
    </div>
  )
}; 