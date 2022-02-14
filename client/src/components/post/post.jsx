import React from "react";
import "./post.css";
import { Link } from "react-router-dom";
const Post = ({ post }) => {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post post-card">
      {post.photo && <img src={PF + post.photo} alt="image" />}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((cats) => (
            <span className="postCat" key={cats.name}>
              {cats.name}
            </span>
          ))}
        </div>
        <Link to={`/posts/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>

        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
};

export default Post;
