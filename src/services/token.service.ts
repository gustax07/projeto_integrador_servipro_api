import { prisma } from '../lib/prisma';

export const blacklistToken = async (token: string, expiresAt: Date) => {
    await prisma.blacklistedToken.create({
        data: {
            token,
            expiresAt,
        },
    });
};

export const isTokenBlacklisted = async (token: string): Promise<boolean> => {
    const blacklisted = await prisma.blacklistedToken.findUnique({
        where: {
            token,
        },
    });
    return !!blacklisted && blacklisted.expiresAt > new Date(); // Retorna true se encontrado e não expirado
};