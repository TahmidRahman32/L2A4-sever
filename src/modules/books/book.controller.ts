import { Request, Response } from "express";
import Book from "./book.model";

const createBook = async (req: Request, res: Response) => {
   try {
      const data = await Book.create(req.body);
      res.status(200).send({
         success: true,
         message: "Book created successfully",
         data,
      });
   } catch (error) {
      console.error("Error creating book:", error);
      res.status(500).json({
         success: false,
         message: "Internal server error",
         error,
      });
   }
};

const getAllBooks = async (req: Request, res: Response) => {
   try {
      const filter = req.query.genre ? req.query.genre : "";

      let data = [];
      if (filter) {
         data = await Book.find({ genre: filter });
      } else {
         data = await Book.find().sort({ genre: "asc" }).limit(10);
      }
      res.status(200).json({
         success: true,
         message: "Books retrieved successfully",
         data,
      });
   } catch (error) {
      // console.error("Error fetching books:", error);
      res.status(500).json({
         success: false,
         message: "Internal server error",
         error,
      });
   }
};

const getBookById = async (req: Request, res: Response) => {
   try {
      const data = await Book.findById(req.params.bookId, { new: true, runValidators: true });
      if (!data) {
         res.status(404).json({
            success: false,
            message: "Book not found",
            data: null,
         });
      }
      res.status(200).json({
         success: true,
         message: "Book retrieved successfully",
         data,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "your request is not valid, please check the bookId",
         error,
      });
   }
};

const updateBook = async (req: Request, res: Response) => {
   try {
      const bookId = req.params.bookId;


      const data = await Book.findByIdAndUpdate(bookId, req.body, {
         new: true,
         runValidators: true,
      });
      if (!data) {
         res.status(404).json({
            success: false,
            message: "Book not found",
            data: null,
         });
      }
      res.status(200).json({
         success: true,
         message: "Book updated successfully",
         data,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Internal server error",
         error,
      });
   }
};

const BookDelete = async (req: Request, res: Response) => {
   try {
      const bookId = req.params.bookId;
      const data = await Book.findByIdAndDelete(bookId, { new: true, runValidators: true });
      if (!data) {
         res.status(404).json({
            success: false,
            message: "Book not found",
            data: null,
         });
      }
      res.status(200).json({
         success: true,
         message: "Book deleted successfully",
         data: null,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Internal server error",
         error,
      });
   }
};

export const bookController = {
   createBook,
   getAllBooks,
   getBookById,
   updateBook,
   BookDelete,
};
