import { Request } from "express";

export const emitEvent = (req: Request, members: string[], event: string, data: any) => {
  req.app.get("io").to(members).emit(event, data);
};

export const getSocketId = (onlineUserIds: Map<string, string>) => {
  const socketIds = Array.from(onlineUserIds.values());
  return socketIds;
};
