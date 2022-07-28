"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootRouter = void 0;
const UserRouter_1 = require("./services/UserService/UserRouter");
const RootRouter = (app) => {
    (0, UserRouter_1.UserRouter)(app);
};
exports.RootRouter = RootRouter;
