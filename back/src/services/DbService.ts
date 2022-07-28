import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

// const connection = await prisma.$connect()