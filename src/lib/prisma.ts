import "server-only";
import {PrismaClient} from "@prisma/client";

const databaseUrl=process.env.DATABASE_URL?.trim();
if(!databaseUrl)throw new Error("DATABASE_URL is required.");
if(!databaseUrl.startsWith("postgresql://")&&!databaseUrl.startsWith("postgres://"))throw new Error("DATABASE_URL must be a PostgreSQL connection URL.");

const globalForPrisma=globalThis as unknown as {prisma?:PrismaClient};
export const prisma=globalForPrisma.prisma??new PrismaClient();
if(process.env.NODE_ENV!=="production")globalForPrisma.prisma=prisma;
