import { Channel, User, PrismaClient, Prisma } from '@prisma/client'

// export enum EntitiesKeys {
//     Channel = 'channel',
//     User = 'user'
// }

export type EntitiesKeys = 'channel' | 'user'
export type PrismaClientType = InstanceType<typeof PrismaClient>
type PrismaUsedMethods = 'create'

type Methods<Entity extends EntitiesKeys> = Pick<PrismaClientType[Entity], PrismaUsedMethods>
export type UserMethods = Methods<'user'>

type StorageEntities = {
    user: UserMethods
}

export interface IStorage extends StorageEntities {}