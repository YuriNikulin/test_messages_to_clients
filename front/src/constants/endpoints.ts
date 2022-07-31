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

    channels: {
        url: 'channels/list',
        method: HTTPMethods.GET
    },

    toggleChannel: {
        url: 'user/toggleChannel',
        method: HTTPMethods.PATCH
    }
}