import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./singlePost.css";
import axios from "axios";
import { Context } from "../../context/Context";
const SinglePost = () => {
  //for update the post
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isUpdateMode, setUpdateMode] = useState(false);

  const { user } = useContext(Context);
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const [post, setPost] = useState([]);

  //fetch all the posts when first time component renders hence [] empty array passed in useEffect
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`/posts/${path}`);
      setPost(res.data);
    };
    getPost();
  }, []);

  //handle deletion
  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${path}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };
  //handle update
  const handleUpdate = async () => {
    try {
      const res = await axios.put(`/posts/${path}`, {
        title,
        desc,
        username: user.username,
      });
      setUpdateMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  const PF = "http://localhost:5000/images/";
  return (
    <div className="single-post">
      <div className="single-post-container">
        {post.photo && (
          <img
            className="single-post-image"
            src={PF + post.photo}
            alt="single-post-img"
          />
        )}
        {isUpdateMode ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="singlePost-TitleInput"
          />
        ) : (
          <h1 className="single-post-title">
            {post.title}
            {post.username === user.username && (
              <div className="single-post-edit">
                <i
                  className="single-post-icon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="single-post-icon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="single-post-info">
          <span>
            written By :
            <Link to={`/?username=${post.username}`} className="link">
              {post.username}
            </Link>
          </span>
          <span className="single-post-date">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {isUpdateMode ? (
          <textarea
            className="singlePost-DescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="single-post-desc">{desc}</p>
        )}
        {isUpdateMode && (
          <button onClick={handleUpdate} className="singlePost-Button">
            submit
          </button>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
