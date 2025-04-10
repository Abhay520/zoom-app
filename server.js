import express from 'express'
import mongoose from 'mongoose';
import home from './app/routes/home.routes.js'
import meeting from './app/routes/meetings.routes.js'
import participant from './app/routes/participants.routes.js'
import { socketManager } from './app/listeners/socketManager.js';

const hostname = '127.0.0.1';
const port = 3000;

const uri = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@zoomcluster.5dtrkuf.mongodb.net/?retryWrites=true&w=majority&appName=ZoomCluster`

const app = express()

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})

mongoose.connect(uri).then(() => console.log("Database connected successfully"))

socketManager()

app.use('/', home)
app.use('/meetings', meeting)
app.use('/participant', participant)


