import { PrismaClient } from "@prisma/client";

console.log("=================================");
console.log("DATABASE_URL ADA:", !!process.env.DATABASE_URL);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DATABASE_URL:", process.env.DATABASE_URL ? "TERBACA" : "TIDAK ADA");
console.log("=================================");

const prisma = new PrismaClient();

export default prisma;