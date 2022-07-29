"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const DbService_1 = require("../services/DbService");
class User {
}
exports.User = User;
_a = User;
User.save = async (req, res) => {
    if (req.body.login && req.body.password) {
        const user = await DbService_1.prisma.user.create({
            data: {
                login: req.body.login,
                password: req.body.password
            }
        });
        console.log(user);
    }
    res.send('ok');
    return {};
};
