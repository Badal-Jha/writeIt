import "./sidebar.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
const SideBar = () => {
  const [cat, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  });
  return (
    <div className="sidebar">
      <h2>ABOUT</h2>
      <div className="sidebar-container">
        <img
          src={require("../../assets/images/photo-6.png").default}
          alt=""
          className="profile-photo"
        />
        <div className="about">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          officiis sapiente doloribus atque, magnam corrupti, quae ullam nulla
          cum enim illo hic nostrum dolore iusto harum tenetur, id minima
          libero!
        </div>

        <div className="sidebar-items">
          <p className="sidebar-title">Categories</p>
          <ul className="sidebar-items-list">
            {cat.map((c) => {
              return (
                <li className="sidebar-item" key={c.name}>
                  <Link to={`/?categories=${c.name}`} className="link">
                    {c.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
