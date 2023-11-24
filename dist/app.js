"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import { StudentRoutes } from './app/modules/ student/student.route';
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//application routes
// app.use('/api/v1/students/', StudentRoutes);
app.get('/', (req, res) => {
    res.send('server is running');
});
exports.default = app;
