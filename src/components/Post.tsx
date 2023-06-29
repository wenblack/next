import React from "react";
import Router from "next/router";


export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div className="p-8 hover:cursor-pointer " onClick={() => Router.push("/details/[id]", `/details/${post.id}`)}>
      <h2 className="text-black font-semibold">{post.title}</h2>
      <small className="text-gray-600  font-thin">By {authorName}</small>
      <p  className="text-blue-500 ">{post.content}</p>
    </div>
  );
};

export default Post;
