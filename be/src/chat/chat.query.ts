import { PrismaClient } from "@prisma/client";
import * as dto from '@chat/chat.dto.js';
import { log } from '@/lib.js';

const prisma = new PrismaClient();

export default class ChatRepo {
  listRoom = async () => await prisma.room.findMany();

  findRoomByRoomId = async (req: string): Promise<dto.iRoomDb | null> =>
    await prisma.room.findFirst({
      where: {
        id: req,
      },
    });

  findRoomByRoomIdentity = async (req: string): Promise<dto.iRoomDb | null> =>
    await prisma.room.findFirst({
      where: {
        roomIdentity: req,
      },
    });

  addRoom = async (req: dto.iJoinReq): Promise<boolean> => {
    try {
      await prisma.room.create({
        data: {
          roomIdentity: req.room_identity,
          userName: [req.user_name],
          chats: undefined,
        },
      });
      return false;
    } catch (e) {
      log((e as Error).toString(), 'error');
      return true;
    }
  };

  editRoomByRoomId = async (req: dto.iLeaveDb): Promise<boolean> => {
    try {
      await prisma.room.update({
        where: {
          id: req.id,
        },
        data: {
          userName: req.userName,
        },
      });
      return false;
    } catch (e) {
      log((e as Error).toString(), 'error');
      return true;
    }
  };

  editRoomByRoomIdentity = async (req: dto.iRoomDb): Promise<boolean> => {
    try {
      await prisma.room.update({
        where: {
          roomIdentity: req.roomIdentity,
        },
        data: {
          userName: req.userName,
        },
      });
      return false;
    } catch (e) {
      log((e as Error).toString(), 'error');
      return true;
    }
  };

  addChat = async (req: dto.iSendChatReq): Promise<boolean> => {
    try {
      await prisma.chat.create({
        data: {
          sender: req.sender,
          message: req.message,
          roomId: req.room_id,
        },
      });
      return false;
    } catch (e) {
      log((e as Error).toString(), 'error');
      return true;
    }
  };

  findChatByRoomId = async (req: string): Promise<dto.iChatDb[] | null> =>
    await prisma.chat.findMany({
      where: {
        roomId: req,
      },
    });
}
