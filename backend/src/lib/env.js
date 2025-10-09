import "dotenv/config";

export const ENV = {
    PORT : process.env.PORT,
    MONGO_URI : process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV : process.env.NODE_ENV,
    CLIENT_URL:process.env.CLIENT_URL,
    RESEND_API_KEY:process.env.RESEND_API_KEY,
    EMAIL_FROM : process.env.EMAIL_FROM,
    EMAIL_FROM_NAME : process.env.EMAIL_FROM_NAME,


};
// PORT = 3000
// MONGO_URI=mongodb+srv://aditya41207_db_user:kNi1pK0H5VsmhfHH@cluster0.vcrowy4.mongodb.net/chatify_db?retryWrites=true&w=majority&appName=Cluster0


// NODE_ENV=development

// JWT_SECRET = myjwtsecret
// RESEND_API_KEY=re_7vDXmNiS_9YYxD6RtTAPCux69A2CgeQ6J
// EMAIL_FROM="onboarding@resend.dev"
// EMAIL_FROM_NAME="Aditya Raj"

// CLIENT_URL=http://localhost:5173