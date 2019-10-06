import * as express from "express";
import * as admin from "firebase-admin";

import Post from "../models/post";

class PostController {
  public path = "/";
  public router = express.Router();
  private db = admin.firestore();

  /**
   * Controller initialization.
   */
  constructor() {
    this.intializeRoutes();
  }

  /**
   * Route initialization.
   */
  public intializeRoutes() {
    this.router.get(this.path, this.index);
    this.router.get(this.path.concat("/:id"), this.show);
    this.router.post(this.path, this.store);
    this.router.put(this.path.concat("/:id"), this.update);
    this.router.delete(this.path.concat("/:id"), this.destroy);
  }

  /**
   * Get list of resources.
   */
  index = async (req: express.Request, res: express.Response) => {
    let limit = parseInt(req.query.limit || 10);
    let page = parseInt(req.query.page || 1);

    try {
      let posts: Post[] = [];
      let postSnapshots = await this.db.collection("posts")
        .limit(limit)
        .offset(limit * (page - 1))
        .get();

      postSnapshots.forEach(document => {
        let post = new Post(document);
        posts.push(post);
      });

      res.json(posts);
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error
      });
    }
  }

  /**
   * Get single resource.
   */
  show = async (req: express.Request, res: express.Response) => {
    try {
      let query = this.db.collection("posts").doc(req.params.id);
      let snapshot = await query.get()

      if (!snapshot.exists) {
        res.status(404).json({
          error: true,
          message: "Post not found."
        });

        return;
      }

      res.json(new Post(snapshot));
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error
      });
    }
  }

  /**
   * Store new resource.
   */
  store = async (req: express.Request, res: express.Response) => {
    try {
      let post = await this.db.collection('posts').add(req.body);

      res.status(201).json({
        error: false,
        message: "Post created.",
        postId: post.id
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error
      });
    }
  }

  /**
   * Update a resource.
   */
  update = async (req: express.Request, res: express.Response) => {
    try {
      await this.db.collection('posts')
        .doc(req.params.id)
        .set(req.body, { merge: true });

      res.json({
        error: false,
        message: "Post updated."
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error
      });
    }
  }

  /**
   * Delete a resource.
   */
  destroy = async (req: express.Request, res: express.Response) => {
    try {
      await this.db.collection('posts')
        .doc(req.params.id)
        .delete();

      res.json({
        error: false,
        message: "Post deleted."
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error
      });
    }
  }
}

export default PostController;
