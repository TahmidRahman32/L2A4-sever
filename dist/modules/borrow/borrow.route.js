"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrow_controller_1 = require("../borrow/borrow.controller");
const bookRoute = (0, express_1.Router)();
bookRoute.get("/borrow", borrow_controller_1.getAllBorrowedBooks);
bookRoute.post("/:bookId/borrow", borrow_controller_1.borrowCreate);
exports.default = bookRoute;
