const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const authRouter = require("./router/auhRouter");
const userRouter = require("./router/userRouter");
const postRouter = require("./router/postRouter");
const commentRouter = require("./router/commentRouter")



const appConfig = (App) => {
  App.use(express.json())
    .use(cors())
    .use(morgan("dev"))
    .use("/api/v1", authRouter)
    .use("/api/v1",userRouter)
    .use("/api/v1",postRouter)
    .use("/api/v1",commentRouter)
    .get("/api/v1", (req, res) => {
      res.send("api is ready");
    })
    .all("*", (req, res) => {
      res.json({
        message: `this route (${req.originalUrl}) does not exist `,
      });
    });
};

module.exports = appConfig;
