import { v2 as cloudinary } from "cloudinary";
import {ENV} from "./env.js";

    // Configuration
    cloudinary.config({ 
        cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
        api_key: ENV.API_KEY, 
        api_secret:ENV.API_SECRET,
    });

    export default cloudinary;