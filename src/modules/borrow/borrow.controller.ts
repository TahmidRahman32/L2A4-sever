import { Request, Response } from "express";
import Book from "../books/book.model";
import { Borrow } from "./borrow.model";

export const borrowCreate = async (req: Request, res: Response) => {
   try {
      const { bookId } = req.params;
      const { quantity, dueDate } = req.body;

      console.log("Received borrow request for bookId:", bookId);
      console.log("Request body:", req.body);

      const book = await Book.findById(bookId);
      console.log("Found book:", book);

      if (!book) {
         console.log("Book not found with id:", bookId);
         return res.status(404).json({ success: false, message: "Book not found" });
      }

      const qty = Number(quantity);
      console.log("Parsed quantity:", qty);

      if (isNaN(qty) || qty <= 0) {
         console.log("Invalid quantity:", quantity);
         return res.status(400).json({ success: false, message: "Invalid quantity" });
      }

      if (book.copies < qty) {
         console.log(`Not enough copies. Available: ${book.copies}, requested: ${qty}`);
         return res.status(400).json({ success: false, message: "Not enough copies available" });
      }

      // Decrement copies
      book.copies -= qty;
      if (book.copies <= 0) {
         book.available = false;
      }

      const updatedBook = await book.save();
      console.log("Book updated successfully:", updatedBook);

      const borrowRecord = await Borrow.create({
         book: book._id,
         quantity: qty,
         dueDate: new Date(dueDate),
         status: "borrowed",
      });

      return res.status(200).json({
         success: true,
         message: `Book borrowed successfully.`,
         book: updatedBook,
         borrow: borrowRecord,
      });
   } catch (error) {
      console.error("Error in borrowCreate:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
   }
};

export const getAllBorrowedBooks = async (req: Request, res: Response) => {
   console.log("📥 GET /api/books/borrow called"); // Debug

   try {
      const data = await Borrow.find().populate({ path: "book", strictPopulate: false });
      console.log("Borrow data from DB:", data); // Debug

      res.status(200).json({
         success: true,
         message: "Borrowed books retrieved successfully",
         data,
      });
   } catch (error) {
      console.error("❌ Error in getAllBorrowedBooks:", error);
      res.status(500).json({
         success: false,
         message: "Failed to retrieve borrowed books",
         error,
      });
   }
};


//    try {
//      const data = await Borrow.find().populate({ path: "book", strictPopulate: false });
//       res.status(200).json({
//          success: true,
//          message: "Borrowed books retrieved successfully",
//          data,
//       });
//    } catch (error) {
//       res.status(500).json({
//          success: false,
//          message: "Failed to retrieve borrowed books",
//          error,
//       });
//    }
// };

// import { Request, Response } from "express";
// import Book from "../books/book.model";
// import { Borrow } from "./borrow.model";
// import { log } from "console";

// const borrowCreate = async (req: Request, res: Response) => {

//    try {
//       const { bookId } = req.params;
//       const { quantity, dueDate, userId } = req.body; // userId from auth
//       console.log(userId);

//       // Find book
//       const book = await Book.findById(bookId);
//       console.log(book, book?.copies);

//       if (!book) {
//          return res.status(404).json({ success: false, message: "Book not found" });
//       }

//       // Check availability
//       if (book.copies < quantity) {
//          res.status(400).json({
//             success: false,
//             message: `Only ${book.copies} copies available`,
//          });
//       }

//       // Reduce available copies
//       book.copies -= quantity;
//       if (book.copies <= 0) {
//          book.available = false; // mark as unavailable
//       }
//       await book.save();

//       // Create borrow record
//       const borrowRecord = await Borrow.create({
//          book: book._id,
//          user: userId,
//          quantity,
//          dueDate: new Date(dueDate),
//          status: "borrowed",
//       });

//       res.json({
//          success: true,
//          message: `Book ${bookId} borrowed successfully.`,
//          borrow: borrowRecord,
//       });
//    } catch (err) {
//       console.error("Borrow error:", err);
//       res.status(500).json({ success: false, message: "Server error" });
//    }
// };

// const bookBorrowGet = async (req: Request, res: Response) => {
//    try {
//       const data = await BookBorrowModel.aggregate(
//          [
//             {
//                $facet: {
//                   book: [
//                      {
//                         $lookup: {
//                            from: "books",
//                            localField: "book",
//                            foreignField: "_id",
//                            as: "bookDetails",
//                         },
//                      },
//                      {
//                         $unwind: "$bookDetails",
//                      },
//                      {
//                         $project: {
//                            title: "$bookDetails.title",
//                            isbn: "$bookDetails.isbn",
//                         },
//                      },
//                   ],
//                   totalQuantity: [
//                      {
//                         $group: {
//                            _id: "bookDetails._id",
//                            totalQuantity: { $sum: "$quantity" },
//                         },
//                      },
//                   ],
//                },
//             },
//          ],
//          { new: true, runValidators: true }
//       );

//       if (!data) {
//          res.status(404).json({
//             success: false,
//             message: "No borrowed books found",
//          });
//       }
//       res.status(200).json({
//          success: true,
//          message: "Borrowed books summary retrieved successfully",
//          data,
//       });
//    } catch (error) {
//       res.status(500).json({
//          success: false,
//          message: "Internal Server Error",
//          error,
//       });
//    }
// };
