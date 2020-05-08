import * as express from "express";
import * as admin from "firebase-admin";
import fileUpload from "../../middlewares/fileUpload";
import * as uuid from "uuid";

import Post from "../../models/post";

class PostController {
  public router = express.Router();
  private db = admin.firestore();
  private fs = admin.storage().bucket();

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
    this.router.post('/post', this.store);
    this.router.put('/post/:id', this.update);
    this.router.delete('/post/:id', this.destroy);
    this.router.post('/upload', fileUpload, this.upload);
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
        message: error.message
      });
    }
  }

  /**
   * Get single resource.
   */
  show = async (req: express.Request, res: express.Response) => {
    try {
      const document = await this.db.collection("posts")
        .doc(req.params.id)
        .get();

      if (!document.exists) {
        res.status(404).json({
          error: true,
          message: "Post not found."
        });

        return;
      }

      res.json(new Post(document));
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error.message
      });
    }
  }

  /**
   * Store new resource.
   */
  store = async (req: express.Request, res: express.Response) => {
    try {
      let { title, content, status, slug, thumbnail, featured, createdAt } = req.body;

      const post = await this.db.collection("posts").add({
        title, content, status, slug, thumbnail, featured,
        createdAt: admin.firestore.Timestamp.fromDate(new Date(createdAt))
      });

      res.status(201).json({
        error: false,
        message: "Post created.",
        postId: post.id
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error.message
      });
    }
  }

  /**
   * Update a resource.
   */
  update = async (req: express.Request, res: express.Response) => {
    try {
      await this.db.collection("posts")
        .doc(req.params.id)
        .set(req.body, { merge: true });

      res.json({
        error: false,
        message: "Post updated."
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error.message
      });
    }
  }

  /**
   * Delete a resource.
   */
  destroy = async (req: express.Request, res: express.Response) => {
    try {
      await this.db.collection("posts")
        .doc(req.params.id)
        .delete();

      res.json({
        error: false,
        message: "Post deleted."
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error.message
      });
    }
  }

  /**
   * Upload a file.
   */
  upload = async (req: any, res: any) => {
    try {
      let file = req.files[0];
      let extension = file.originalname.split('.').pop();
      let filename = `media/${uuid.v4()}.${extension}`;
      let ref = this.fs.file(filename);

      await ref.save(file.buffer);
      await ref.makePublic();

      res.json({
        error: false,
        message: "File uploaded.",
        file: `https://firebasestorage.googleapis.com/v0/b/${this.fs.name}/o/${encodeURIComponent(filename)}?alt=media`
      });
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error.message
      });
    }
  }
}

export default PostController;
