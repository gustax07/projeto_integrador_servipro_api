import { PrismaClient } from '@prisma/client';

// Isso garante que não criemos múltiplas conexões com o banco em desenvolvimento
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // Loga as queries para facilitar o desenvolvimento
  });



if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;


