import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Application.
import App from "./app";

// Controller.
import PostController from "./controllers/PostController";

// Initialize Firebase application.
admin.initializeApp({ credential: admin.credential.applicationDefault() });

// Initialize Express.
const bootstrap = new App([new PostController()]);

// Return Express instance to Firebase Functions.
exports.v1 = functions
    .region('asia-east2')
    .https
    .onRequest(bootstrap.app);
