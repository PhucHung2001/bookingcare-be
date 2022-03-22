import express from "express";
import bodyParser from "body-parser"; // ho tro lay tham so phia client xu ly cho chung ta
// /user?id=7 muon lay so 7 dung body parser
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";
require("dotenv").config(); // chjay dc dong 15

let app = express();
// var cors = require("cors");
// app.use(cors({ origin: true, credentials: true }));
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
// config app
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8080;
// Port ==== undefind => port = 6969

app.listen(port, () => {
  //callback function
  console.log("backend nodejs is running on the port:" + port);
});
