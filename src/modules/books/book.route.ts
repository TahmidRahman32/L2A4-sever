import { Router } from "express";
import { bookController } from "./book.controller";

const bookRoute = Router();

bookRoute.post("/", bookController.createBook);
bookRoute.get("/", bookController.getAllBooks);
bookRoute.get("/:bookId", bookController.getBookById);
bookRoute.patch("/:bookId", bookController.updateBook);
bookRoute.delete("/:bookId", bookController.BookDelete);

export default bookRoute;
