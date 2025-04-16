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
import { authenticateMiddleware } from './app/middleware/authenticator.middleware.js';

const hostname = 'localhost';
const port = 3000;

const __dirname = path.resolve("app");

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Zoom Express API with Swagger",
      version: "1.0.0",
      description:
        "This is a web application which communicates with zoom websocket to get meeting information using Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Abhay Panchoo",
        url: "https://abhayproject.xyz/zoom-app",
        email: "",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/zoom-app",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          name : 'Authorization'
        },
      },
    }
  },
  apis: ["./app/routes/*.js"],
};

const specs = swaggerJSDoc(options);

const uri = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@zoomcluster.5dtrkuf.mongodb.net/?retryWrites=true&w=majority&appName=ZoomCluster`

const app = express()

app.use("/zoom-app/api-docs",swaggerUi.serve,swaggerUi.setup(specs, { explorer: true }));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/zoom-app/`);
})

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "", "views"));

mongoose.connect(uri).then(() => console.log("Database connected successfully"))

//socketManager()

if (process.env.NODE_ENV === "production") {
  app.set('trust proxy', 1) // trust first proxy
  app.use(session({secret: 'keyboard cat',resave: false,saveUninitialized: true,
    cookie: { secure: true , maxAge : 600000}
  }))
}

if (process.env.NODE_ENV === "development") {
  app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
}

app.use(express.static(path.join(__dirname, "", 'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/zoom-app/', home)
app.use('/zoom-app/login', login)
app.use('/zoom-app/meetings',authenticateMiddleware, meeting)
app.use('/zoom-app/participants',authenticateMiddleware, participant)


