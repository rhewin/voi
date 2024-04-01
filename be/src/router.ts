import express from "express";
import {
  joinHandler,
  leaveHandler,
  listChatHandler,
  sendChatHandler,
} from '@chat/chat.handler.js';
import { healthHandler } from '@middleware/health.handler.js';

const router = express.Router();
const apiV1 = "/api/v1";
router.get(apiV1.concat('/health'), healthHandler);
router.post(apiV1.concat("/join"), joinHandler);
router.post(apiV1.concat('/leave'), leaveHandler);
router.get(apiV1.concat('/chat/:roomId'), listChatHandler);
router.post(apiV1.concat('/send_chat'), sendChatHandler);

export default router;
