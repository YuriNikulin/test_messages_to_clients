import { Channel, User, PrismaClient, Prisma } from '@prisma/client'

// export enum EntitiesKeys {
//     Channel = 'channel',
//     User = 'user'
// }

export type EntitiesKeys = 'channel' | 'user'
export type PrismaClientType = InstanceType<typeof PrismaClient>


type StorageEntitiesMethod<P, R = any> = (payload: P) => Promise<R>

interface DataCommon {
    entity: EntitiesKeys;
}

interface CreateDataUser extends DataCommon {
    entity: 'user';
    payload: {
        data: User
    }
}

interface CreateDataChannel extends DataCommon {
    entity: 'channel';
    payload: {
        data: Channel
    }
}

interface FindManyUser extends DataCommon {
    entity: 'user';
    payload: {
        where: User
    }
}

interface FindManyChannel extends DataCommon {
    entity: 'user';
    payload: {
        where: Channel
    }
}

export type CreateData = CreateDataUser | CreateDataChannel

type StorageEntities = {
    create: StorageEntitiesMethod<CreateData>
    // createMany: () => any;
    // findMany: () => any;
    // update: () => any;
}

export interface IStorage extends StorageEntities {}