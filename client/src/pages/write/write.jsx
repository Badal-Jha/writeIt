import React, { useContext, useState } from "react";
import "./write.css";

import { Context } from "../../context/Context";
import axios from "axios";
const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      desc,
      username: user.username,
    };
    if (file) {
      const formData = new FormData();
      const filename = Date.now() + file.name;
      formData.append("name", filename);
      formData.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", formData);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/posts/" + res.data._id);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="write">
      {file && (
        <img src={URL.createObjectURL(file)} alt="" className="write-img" />
      )}
      <form className="write-form" onSubmit={handleSubmit}>
        <div className="writeForm-group">
          <label htmlFor="file-input">
            <i className="write-icon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="file-input"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            className="write-input"
            autoFocus={true}
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeForm-group">
          <textarea
            className="write-input write-text"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button className="write-submit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
