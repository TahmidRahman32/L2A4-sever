import { Router } from "express";
import { borrowCreate, getAllBorrowedBooks } from "../borrow/borrow.controller";

const bookRoute = Router();

bookRoute.get("/borrow", getAllBorrowedBooks);
bookRoute.post("/:bookId/borrow", borrowCreate);

export default bookRoute;
