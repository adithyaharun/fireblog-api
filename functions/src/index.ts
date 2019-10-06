import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Application.
import App from "./app";

// Controller.
import PostController from "./controllers/PostController";

// Initialize Firebase application.
admin.initializeApp({ credential: admin.credential.applicationDefault() });

// Initialize Express.
const postApi = new App([new PostController()]);

// Return Express instance to Firebase Functions.
exports.post = functions.https.onRequest(postApi.app);
