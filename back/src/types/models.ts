import { Channel, User, PrismaClient, Prisma } from '@prisma/client'

export type UserModel = User & {
    channels: Channel[];
}

export type EntitiesKeys = 'channel' | 'user'
export type PrismaClientType = InstanceType<typeof PrismaClient>
type PrismaUsedMethods = 'create' | 'findMany' | 'findFirst'

type Methods<Entity extends EntitiesKeys> = Pick<PrismaClientType[Entity], PrismaUsedMethods>
export type UserMethods = Methods<'user'>
export type UserMethodsPayload = {
    [method in keyof UserMethods]: Parameters<UserMethods[method]>[0]
}

export type ChannelMethods = Methods<'channel'>
export type ChannelMethodsPayload = {
    [method in keyof ChannelMethods]: Parameters<ChannelMethods[method]>[0]
}

type StorageEntities = {
    user: UserMethods;
    channel: ChannelMethods;
}

export interface IStorage extends StorageEntities {}