import "./posts.css";
import React from "react";
import Post from "../post/post";
class Posts extends React.Component {
  render() {
    const { posts } = this.props;
    console.log(posts);
    return (
      <div className="posts-container">
        {posts.map((post) => {
          return <Post post={post} key={post.title} />;
        })}
      </div>
    );
  }
}

export default Posts;
