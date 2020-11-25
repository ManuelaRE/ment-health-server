import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import * as userController from './userController.js';

const app = express();
app.use(cors());
app.use(bodyParser.json())

// GET endpoint which returns/sends all our users in the response
app.get('/', userController.get)

// POST endpoint which takes the user from the request body and saves it...
app.post('/create', userController.post)

// DELETE endpoint which deletes the user which is sent in the request body...
app.delete('/delete', userController.remove);

// GET endpoint returns all the moods logged in our database
app.get("/getMood", userController.getMood);

// POST takes a new mood and stores itexpress
app.post("/mood", userController.checkDuplicate);

// Finally! Listen on Port 8080
app.listen(process.env.PORT || 8080);