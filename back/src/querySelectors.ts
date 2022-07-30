import { Prisma } from "@prisma/client";

export const userQuerySelector: Prisma.UserSelect = {
    id: true,
    login: true,
    channels: true
}