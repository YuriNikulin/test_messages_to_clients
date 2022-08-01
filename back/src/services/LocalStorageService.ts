// @ts-nocheck
import { ChannelMethods, ChannelModel, IStorage, UserMethods, UserModel } from "types/index";

const channels = {
    vk: {
        id: 'vk', name:  'ВКонтакте'
    },
    whatsapp: {
        id: 'whatsapp',
        name: 'WhatsApp'
    },
    tg: {
        id: 'tg',
        name:  'Telegram'
    },
    sms: {
        id: 'sms',
        name:  'СМС'
    }
}
let counter = 1
const getId = () => {
    return counter++
}
interface Table {
    user: UserModel
    channel: Record<string, ChannelModel>
} 

class LocalStorageServiceClass implements IStorage {
    storage: Table = {
        user: {
            id: 1,
            login: 'user',
            channels: [channels.vk],
            userMessages: [],
            password: 'user'
        },
        channel: channels
    }

    user: UserMethods = {
        create: (args) => {
            const id = getId()
            const res = {
                ...args.data,
                channels: [channels.vk],
                id,
                userMessages: []
            }
           
            this.storage.user = res
        },
        findFirst: () => {
            return this.storage.user
        },
        findMany: () => {
            return []
        },
        update: (args) => {
            const res = {
                ...this.storage.user,
                ...args.data
            }

            if (args.data.userMessages) {
                const data = args.data.userMessages.create || args.data.userMessages.updateMany?.data
                const channelId = args.data.userMessages.create?.channelId || args.data.userMessages.updateMany?.where?.channelId
                res.userMessages = this.storage.user.userMessages?.filter(m => m.channelId !== channelId).concat({
                    channelId,
                    ...data,
                    content: data.content
                })
            }

            if (args.data.channels) {
                if (args.data.channels.connect) {
                    res.channels = this.storage.user.channels.concat(this.storage.channel[args.data.channels.connect.id])
                } else if (args.data.channels.disconnect) {
                    res.channels = this.storage.user.channels.filter(c => c.id !== args.data.channels?.disconnect.id)
                }
            }
            this.storage.user = res
        },
    }

    channel: ChannelMethods = {
        findFirst: (args) => {
            return this.storage.channel[args?.where?.id]
        },
        findMany: () => {
            return Object.values(this.storage.channel)
        }
    }
}

export const LocalStorageService = new LocalStorageServiceClass()