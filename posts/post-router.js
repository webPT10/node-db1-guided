const express = require("express");
const db = require("../data/config");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await db.select("*").from("posts");
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const post = await db
      .first("*")
      .from("posts")
      .where("id", req.params.id);
    res.json(post);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const payload = {
      title: req.body.title,
      contents: req.body.contents
    };
    const [id] = await db("posts").insert(payload);
    const newPost = await db("posts")
      .where("id", id)
      .first();
    res.json(newPost);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
      const payload = {
          title: req.body.title,
          contents: req.body.contents
      }
      await db('posts').where('id', req.params.id).update(payload)
      const post = await db('posts').where('id', req.params.id).first()
      res.json(post)
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
      await db('posts').where('id', req.params.id).del()
      res.status(204).end()
  } catch (error) {
    next(error);
  }
});

module.exports = router;
