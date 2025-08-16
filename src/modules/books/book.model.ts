import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";


const bookSchema = new Schema<IBook>(
   {
      title: { type: String, required: true },
      author: { type: String, required: true },
      genre: { type: String, required: true },
      description: { type: String, required: true },
      copies: { type: Number, required: true, min: 0 },
      available: { type: Boolean, default: true },
      isbn: { type: String, unique: true, sparse: true },
   },
   { timestamps: true, versionKey: false }
);

const Book = model<IBook>("Book", bookSchema);
export default Book;
