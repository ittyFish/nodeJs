import express from "express";
import {config} from "dotenv";
import morgan from "morgan";
import { connectToDb } from "./config/dbConfig.js";


import prodRouter from "./Routes/product.js"
import userRouter from "./Routes/user.js"


config();
connectToDb();

const app=express();

app.use(express.json())


app.use("/product",prodRouter)
app.use("/user",userRouter)


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
    next();
  });

let port =process.env.PORT||3500

app.listen(port,()=>{
    console.log(`app is runing on ${port}`)})

 