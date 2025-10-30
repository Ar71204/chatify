// const express = require("express");
import express from "express";

import cookieParser from "cookie-parser";
import path from "path";

import messageRoutes from "./routes/message.route.js";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { ENV } from "./lib/env.js";
// for to calll the port from . env file
//otherwise it will give u undefined behaviour

const app = express();

const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;


app.use(express.json({ limit: "10mb" }));
//req.body
app.use(cors({origin:ENV.CLIENT_URL, credentials:true}));
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use("/api/messages", messageRoutes);


// ready for deployment

if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    // what we are doing is moving the frontend part to the the backend so as to start as a common chat
    // app  and making the frontend static assest

    app.get("*", (_,res)=>{
        res.sendFile(path.join(__dirname, "../frontend","dist","index.html"));
    });
}


app.listen(PORT, ()=> {
    console.log("Server running on port" + PORT);
    connectDB();
});