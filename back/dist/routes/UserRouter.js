"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const entities_1 = require("../entities");
const UserRouter = (app) => {
    app.get('/user', (req, res) => {
        res.send('get user');
    });
    app.post('/user', entities_1.User.save);
};
exports.UserRouter = UserRouter;
