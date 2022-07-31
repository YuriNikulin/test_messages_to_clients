import { StorageService } from '../services/StorageService'

class Channel {
    public static async getAll() {
        return await StorageService.channel.findMany()
    }
}

export { Channel }