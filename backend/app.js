const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require('path');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };
  
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true}));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "config/.env",
    });
}

// Serve the React build (if applicable)
app.use(express.static(path.join(__dirname, 'client/build')));

// import routes
const file_upload = require("./controller/upload_files");

app.use("/api/v2/file_upload", file_upload);

module.exports = app;