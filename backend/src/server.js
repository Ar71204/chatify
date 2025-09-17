// const express = require("express");
import express from "express";

import dotenv from "dotenv"

import messageRoutes from "./routes/message.route.js";
import authRoutes from "./routes/auth.route.js";
// for to calll the port from . env file
//otherwise it will give u undefined behaviour
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;




app.use("/api/auth", authRoutes);

app.use("/api/messages", messageRoutes);



app.listen(PORT, ()=> console.log("Server running on port" + PORT));