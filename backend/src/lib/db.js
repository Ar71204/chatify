import mongoose from "mongoose";
import { ENV } from "./env.js";
export const connectDB = async () => {
    try{
        const {MONGO_URI} = ENV;
        if(!MONGO_URI) throw new Error("MONGO_URI is not set");
        // a good practice to first cehck if it is set or not
        const conn = await mongoose.connect(ENV.MONGO_URI)
        console.log("MONGODB CONNECTED:", conn.connection.host)
    } catch(error){
        console.error("Error connection to MONGODB:", error)

        process.exit(1);// 1 means failed and 0 means fine connection

    }
}