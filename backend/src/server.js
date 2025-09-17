// const express = require("express");
import express from "express";

import dotenv from "dotenv"

import path from "path";

import messageRoutes from "./routes/message.route.js";
import authRoutes from "./routes/auth.route.js";
// for to calll the port from . env file
//otherwise it will give u undefined behaviour
dotenv.config();

const app = express();

const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;




app.use("/api/auth", authRoutes);

app.use("/api/messages", messageRoutes);


// ready for deployment

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    // what we are doing is moving the frontend part to the the backend so as to start as a common chat
    // app  and making the frontend static assest

    app.get("*", (_,res)=>{
        res.sendFile(path.join(__dirname, "../frontend","dist","index.html"));
    });
}


app.listen(PORT, ()=> console.log("Server running on port" + PORT));