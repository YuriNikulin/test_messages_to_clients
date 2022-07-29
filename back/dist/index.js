"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RootRouter_1 = require("./routes/RootRouter");
const config_json_1 = __importDefault(require("./config.json"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(config_json_1.default.common.port);
(0, RootRouter_1.RootRouter)(app);
