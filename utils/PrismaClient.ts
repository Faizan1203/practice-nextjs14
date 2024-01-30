import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient;

export const retrievePrismaClient = () => {
  if (!prismaClient) {
    prismaClient = new PrismaClient();
  }
  return prismaClient;
};
