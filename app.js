import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import home from './app/routes/home.routes.js'
import meeting from './app/routes/meetings.routes.js'
import participant from './app/routes/participants.routes.js'
import login from './app/routes/login.routes.js'
import path from 'path';
import session from 'express-session'
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'
import { socketManager } from './app/listeners/socketManager.js';
import { authenticateMiddleware } from './app/middleware/authenticate.middleware.js';
import { readFile } from 'fs/promises';
import rateLimit from 'express-rate-limit';
import  createMemoryStore  from 'memorystore';

const hostname = 'localhost';
const port = 3000;

const limiter = rateLimit({
  windowMs:  60 * 1000,
  max: 10,
});

const __dirname = path.resolve("app");

const swaggerJSON = JSON.parse(await readFile(new URL('./config/swagger.json', import.meta.url)))

const specs = swaggerJSDoc(swaggerJSON);

const uri = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@zoomcluster.5dtrkuf.mongodb.net/?retryWrites=true&w=majority&appName=ZoomCluster`

const app = express()

app.use("/zoom-app/api-docs",swaggerUi.serve,swaggerUi.setup(specs, { explorer: true }));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/zoom-app/`);
})

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "", "views"));

mongoose.connect(uri).then(() => console.log("Database connected successfully"))

const MemoryStore = createMemoryStore(session)

if (process.env.NODE_ENV === "production") {
  socketManager()
  app.set('trust proxy', 1) // trust first proxy
  app.use(session({secret: process.env.SESSION_SECRET,resave: false,saveUninitialized: true,
    proxy : true,
    cookie: { secure: true , maxAge : 10 * 60 * 1000},
    store: new MemoryStore({
      checkPeriod: 10 * 60 * 1000
    }),
  }))
}
else if (process.env.NODE_ENV === "development") {
  app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
}

app.use(limiter);
app.use(express.static(path.join(__dirname, "", 'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/zoom-app/', home)
app.use('/zoom-app/login', login)
app.use('/zoom-app/meetings',authenticateMiddleware, meeting)
app.use('/zoom-app/participants',authenticateMiddleware, participant)


