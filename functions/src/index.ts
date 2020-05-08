import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Application.
import App from "./app";

// Controller.
import PublicPostController from "./controllers/PostController";
import AdminPostController from "./controllers/admin/PostController";

// Initialize Firebase application.
admin.initializeApp();

// Initialize Express.
const publicApi = new App([new PublicPostController()]);
const adminApi = new App([new AdminPostController()]);

// Return Express instance to Firebase Functions.
exports.v1 = functions
    .region('asia-east2')
    .https
    .onRequest(publicApi.app);

exports.admin = functions
    .region('asia-east2')
    .https
    .onRequest(adminApi.app);
