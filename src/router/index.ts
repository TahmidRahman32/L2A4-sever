import { Router } from "express";
import bookRoute from "../modules/books/book.route";
import bookBorrowRoute from "../modules/borrow/borrow.route";

const routers = Router();

routers.use("/api/books", bookBorrowRoute);
routers.use("/api/books", bookRoute);
export default routers;

// routers.use("/api/books", bookRoute);
