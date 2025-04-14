import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import home from './app/routes/home.routes.js'
import meeting from './app/routes/meetings.routes.js'
import participant from './app/routes/participants.routes.js'
import login from './app/routes/login.routes.js'
import path from 'path';
import session from 'express-session'
import { socketManager } from './app/listeners/socketManager.js';
import { authenticateMiddleware } from './app/middleware/authenticator.middleware.js';

const hostname = 'localhost';
const port = 3000;

const __dirname = path.resolve("app");

const uri = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@zoomcluster.5dtrkuf.mongodb.net/?retryWrites=true&w=majority&appName=ZoomCluster`

const app = express()

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/zoom-app/`);
})

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "", "views"));

mongoose.connect(uri).then(() => console.log("Database connected successfully"))

//socketManager()
app.use(session({ secret: 'your_session_secret', resave: false, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, "", 'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/zoom-app/', home)
app.use('/zoom-app/login', login)
app.use('/zoom-app/meetings',authenticateMiddleware, meeting)
app.use('/zoom-app/participants',authenticateMiddleware, participant)


