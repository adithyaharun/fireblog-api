import * as express from "express";
import * as admin from "firebase-admin";

import Post from "../models/post";

class PostController {
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
    this.router.get('/post', this.index);
    this.router.get('/post/:id', this.show);
  }

  /**
   * Get list of resources.
   */
  index = async (req: express.Request, res: express.Response) => {
    const limit = parseInt(req.query.limit || 10);
    const page = parseInt(req.query.page || 1);

    try {
      const posts: Post[] = [];
      const postSnapshots = await this.db.collection("posts")
        .where("status", "==", "published")
        .orderBy("createdAt", "desc")
        .limit(limit)
        .offset(limit * (page - 1))
        .get();

      postSnapshots.forEach((document: FirebaseFirestore.DocumentSnapshot) => {
        const post = new Post(document);
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
      const snapshot = await this.db.collection("posts")
        .where('slug', '==', req.params.id)
        .where('status', '==', 'published')
        .limit(1)
        .get();

      if (snapshot.empty) {
        res.status(404).json({
          error: true,
          message: "Post not found."
        });

        return;
      }

      res.json(new Post(snapshot.docs[0]));
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error
      });
    }
  }
}

export default PostController;
