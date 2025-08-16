"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
    isbn: { type: String, unique: true, sparse: true },
}, { timestamps: true, versionKey: false });
const Book = (0, mongoose_1.model)("Book", bookSchema);
exports.default = Book;
