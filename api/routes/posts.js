const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
//Create Post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    console.log(newPost);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(501).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username == req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You dont have access to update!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POST

router.get("/", async (req, res) => {
  const username = req.query.username;
  const categoryname = req.query.categories;

  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (categoryname) {
      posts = await Post.find({
        categories: {
          $in: [categoryname],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE Post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username == req.body.username) {
      try {
        await post.delete();
        res.status(200).json("post has been deleted succefully!");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You dont have access to delete!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
