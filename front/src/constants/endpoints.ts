import { HTTPMethods } from "types";

export const endpoints = {
    login: {
        url: 'user/login',
        method: HTTPMethods.POST
    },

    getUserInfo: {
        url: 'user/info',
        method: HTTPMethods.GET
    },

    register: {
        url: 'user/register',
        method: HTTPMethods.POST
    },

    toggleChannel: {
        url: 'user/toggleChannel',
        method: HTTPMethods.PATCH
    },

    channels: {
        url: 'channels/list',
        method: HTTPMethods.GET
    },

    getChannelDetails: {
        url: 'channels/info',
        method: HTTPMethods.POST
    },

    editMessage: {
        url: 'user/editMessage',
        method: HTTPMethods.PATCH
    }
}