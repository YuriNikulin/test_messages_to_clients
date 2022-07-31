import { StorageService } from '../services/StorageService'

class Channel {
    public static async getAll() {
        return await StorageService.channel.findMany()
    }

    public static async getById(id: string) {
        return await StorageService.channel.findFirst({
            where: {
                id
            }
        })
    }
}

export { Channel }