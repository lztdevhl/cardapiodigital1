import {PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma=new PrismaClient();

async function main(){
  const databaseUrl=process.env.DATABASE_URL?.trim();
  if(!databaseUrl)throw new Error("DATABASE_URL is required.");
  if(!databaseUrl.startsWith("postgresql://")&&!databaseUrl.startsWith("postgres://"))throw new Error("DATABASE_URL must be a PostgreSQL connection URL.");
  const email=process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password=process.env.ADMIN_PASSWORD;
  if(!email)throw new Error("ADMIN_EMAIL is required.");
  if(!/^\S+@\S+\.\S+$/.test(email))throw new Error("ADMIN_EMAIL must be a valid email address.");
  if(!password)throw new Error("ADMIN_PASSWORD is required.");
  if(password.length<12)throw new Error("ADMIN_PASSWORD must contain at least 12 characters.");
  const passwordHash=await bcrypt.hash(password,12);
  await prisma.admin.upsert({where:{email},update:{passwordHash},create:{email,passwordHash}});
  await prisma.restaurantSettings.upsert({where:{id:"default"},update:{},create:{id:"default"}});
}

main().catch(error=>{console.error(error instanceof Error?error.message:"Seed failed.");process.exitCode=1}).finally(()=>prisma.$disconnect());
