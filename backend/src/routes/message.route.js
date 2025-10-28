import express from "express";
import {
  getAllContacts,
  getMessagesByUserId,
  sendMessage,
  getChatPartners
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js"; //  temporarily disabled

const router = express.Router();

// the middlewares execute in order - so requests get rate-limited first, then authenticated.
//  Arcjet is disabled for now to avoid “Bot access denied” in Postman / local tests.
router.use(arcjetProtection, protectRoute);

router.use(protectRoute); //  only auth middleware for now

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);

export default router;
