
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

import {ENV} from "../lib/env.js";

export const signup = async (req, res) =>
{
    const {fullName, email, password} = req.body;
    const name  = typeof fullName === "string" ? fullName.trim() : "";
    const validEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const pass  = typeof password === "string" ? password : "";
    try {
        if(!name|| !validEmail || !pass){
            return res.status(400).json({message : "All fields are required"});
        }
        if(pass.length < 6)
        {
            return res.status(400).json({message : "Password must be at least 6 characters"});
        }
        // checking validity of email
        // using regex

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(validEmail))
        {
            return res.status(400).json({ message : "Invalid email format" });
        }

        const existing  = await User.findOne({email : validEmail});
        if(existing) return res.status(400).json({message : "Email already exists"});

        // we will do the password hashing
        const salt  = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pass,salt);

        const newUser  = new User({
            fullName,
            email,
            fullName : name,
            email : validEmail,
            password : hashedPassword
        });

        if(newUser)
        {
            // persist user first then issue the jwt auth cookie back to client
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);


            res.status(201).json({_id:newUser._id,fullName:newUser.fullName,email:newUser.email,profilePic:newUser.profilePic,});

            try {
                await sendWelcomeEmail(savedUser.email,savedUser.fullName,ENV.CLIENT_URL);

            } catch (error) {
                console.error("Failed to send welcome email:", error);
            }
        }
        else{
            res.status(400).json({message : "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup controller:", error);
        res.status(500).json({ message : "Internal server error" })
    }
}