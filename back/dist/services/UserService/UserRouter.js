"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const UserRouter = (app) => {
    app.get('/user', (req, res) => {
        res.send('get user');
    });
    app.post('/user', (req, res) => {
        res.send('post user');
    });
};
exports.UserRouter = UserRouter;
