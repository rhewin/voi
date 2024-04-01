import { Request, Response, NextFunction } from "express";
import { log } from "@/lib.js";
import * as dto from '@chat/chat.dto.js';
import ChatRepo from '@chat/chat.query.js';

export const chatRepo = new ChatRepo();

export const joinHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const reqBody = JSON.stringify(req.body);
  log(`Hit api path: ${req.url}, method: ${req.method}, data: ${reqBody}`);

  try {
    const joinReq: dto.iJoinReq = req.body;
    if (joinReq.room_identity == '' || joinReq.user_name == '') {
      res.status(400).json({ error: 'make sure roomid or username is valid' });
      return;
    }

    // find room based on requested room
    const room = await chatRepo.findRoomByRoomIdentity(joinReq.room_identity);
    if (room == null) {
      // Because room is new, so create new room and then return the room
      if (await chatRepo.addRoom(joinReq)) {
        res.status(500).json({ error: 'internal error' });
        return;
      }
      const result = await chatRepo.findRoomByRoomIdentity(
        joinReq.room_identity
      );
      res.json({ data: result, msg: 'success create & join room' });
      return;
    }

    // if room exist, check for duplicate user_alias
    // if user_alias already exist in the requested room then reject it
    if (room.userName.includes(joinReq.user_name)) {
      res.status(422).json({ error: 'user name is already taken' });
      return;
    }

    // else just join as new member
    room.userName.push(joinReq.user_name);
    if (await chatRepo.editRoomByRoomIdentity(room)) {
      res.status(500).json({ error: 'internal error' });
      return;
    }
    const result = await chatRepo.findRoomByRoomIdentity(joinReq.room_identity);
    res.json({ data: result, msg: 'success join room' });
  } catch (error: any) {
    next(error.message);
  }
};

export const leaveHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqBody = JSON.stringify(req.body);
  log(`Hit api path: ${req.url}, method: ${req.method}, data: ${reqBody}`);

  try {
    // find room based on requested room
    const leaveReq: dto.iLeaveReq = req.body;
    const room = await chatRepo.findRoomByRoomId(leaveReq.room_id);
    if (room != null) {
      // remove as a member
      const updateReq = {
        id: leaveReq.room_id,
        userName: room.userName.filter((name) => name !== leaveReq.user_name),
      };
      if (await chatRepo.editRoomByRoomId(updateReq)) {
        res.status(500).json({ error: 'internal error' });
        return;
      }
    }

    res.json({ data: null, msg: 'success leave room' });
  } catch (error: any) {
    next(error.message);
  }
};

export const sendChatHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const reqBody = JSON.stringify(req.body);
  log(`Hit api path: ${req.url}, method: ${req.method}, data: ${reqBody}`);

  try {
    // find room based on requested room
    const sendChatReq: dto.iSendChatReq = req.body;

    // if message empty, don't process anything, just return success
    if (sendChatReq.message == "") {
      res.json({ data: null, msg: 'success send empty chat message' });
      return
    }

    const room = await chatRepo.findRoomByRoomId(sendChatReq.room_id);
    // if can't find room then it's invalid room
    if (room == null) {
      res.status(422).json({ error: 'invalid room' });
      return;
    }
    // if can't find user in that room then it's invalid user
    if (!room.userName.includes(sendChatReq.sender)) {
      res.status(422).json({ error: 'invalid user' });
      return;
    }

    // else just add chat message
    if (await chatRepo.addChat(sendChatReq)) {
      res.status(500).json({ error: 'internal error' });
      return;
    }

    res.json({ data: null, msg: 'success send chat message' });
  } catch (error: any) {
    next(error.message);
  }
};

export const listChatHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  log(`Hit api path: ${req.url}, method: ${req.method}, params: ${req.params.roomId}`);

  try {
    // find chat based on requested room
    const chat = await chatRepo.findChatByRoomId(req.params.roomId);

    res.json({ data: chat, msg: 'success get chat' });
  } catch (error: any) {
    next(error.message);
  }
};
