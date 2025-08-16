"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    title: String,
    author: String,
    genre: String,
    isbn: String,
    copies: { type: Number, default: 1 },
    available: { type: Boolean, default: true },
    description: String,
});
exports.default = mongoose_1.default.model("Book", bookSchema);
