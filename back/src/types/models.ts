import { Channel, User, PrismaClient, Prisma } from '@prisma/client'

export type EntitiesKeys = 'channel' | 'user'
export type PrismaClientType = InstanceType<typeof PrismaClient>
type PrismaUsedMethods = 'create' | 'findMany' | 'findFirst'

type Methods<Entity extends EntitiesKeys> = Pick<PrismaClientType[Entity], PrismaUsedMethods>
export type UserMethods = Methods<'user'>
export type UserMethodsPayload = {
    [method in keyof UserMethods]: Parameters<UserMethods[method]>[0]
}

type StorageEntities = {
    user: UserMethods
}

export interface IStorage extends StorageEntities {}