
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
   title: String,
   author: String,
   genre: String,
   isbn: String,
   copies: { type: Number, default: 1 },
   available: { type: Boolean, default: true },
   description: String,
});

export default mongoose.model("Book", bookSchema);
