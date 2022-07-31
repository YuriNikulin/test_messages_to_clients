export const routes = {
    channels: {
        id: 'channels',
        path: '/my-channels',
        title: 'Мои каналы'
    },
    channelDetail: {
        id: 'channelsDetail',
        path: '/channels/:id',
        getUrl: (id: string) => `/channels/${id}`
    }
}
