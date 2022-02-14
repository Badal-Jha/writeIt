import "./home.css";

import Header from "../components/header/header";
import Posts from "../components/posts/posts";
import SideBar from "../components/sidebar/sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import About from "../components/about/about";
const Home = () => {
  const [posts, setPost] = useState([]);
  const { search } = useLocation();

  //to decode encoded string
  decodeURI(search);

  console.log(search);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      console.log(res);
      setPost(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <About />
      <div id="home-section" className="home">
        <Posts posts={posts} />
      </div>
    </>
  );
};

export default Home;
