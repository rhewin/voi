export interface iJoinReq {
  room_identity: string;
  user_name: string;
}

export interface iLeaveReq {
  room_id: string;
  user_name: string;
}

export interface iSendChatReq {
  room_id: string;
  sender: string;
  message: string;
}

export interface iRoomDb {
  roomIdentity: string;
  userName: string[];
  chats?: iChatDb[];
}

export interface iChatDb {
  sender: string;
  message: string;
  timestamp: Date;
  roomId: string | null;
}

export interface iLeaveDb {
  id: string;
  userName: string[];
}
