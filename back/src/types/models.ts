import { Channel, User, PrismaClient, Prisma } from '@prisma/client'
import { Message as CommonMessage } from '../../../common/types'
export { ChannelContentConfig } from '../../../common/types'

export interface Message extends CommonMessage {
    
}

export type MessageDB = Message & {
    content: string;
}

export type UserModel = User & {
    channels: Channel[];
    userMessages?: MessageDB[];
}

export type EntitiesKeys = 'channel' | 'user'
export type PrismaClientType = InstanceType<typeof PrismaClient>
type PrismaUsedMethods = 'create' | 'findMany' | 'findFirst' | 'update'

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