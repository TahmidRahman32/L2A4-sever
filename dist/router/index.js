"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_route_1 = __importDefault(require("../modules/books/book.route"));
const borrow_route_1 = __importDefault(require("../modules/borrow/borrow.route"));
const routers = (0, express_1.Router)();
routers.use("/api/books", borrow_route_1.default);
routers.use("/api/books", book_route_1.default);
exports.default = routers;
// routers.use("/api/books", bookRoute);
