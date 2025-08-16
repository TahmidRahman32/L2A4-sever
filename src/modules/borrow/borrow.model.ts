

import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema(
   {
      book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
      quantity: {
         type: Number,
         required: true,
         min: [1, "Quantity must be at least 1"],
      },
      dueDate: {
         type: Date,
         required: true,
      },
      status: {
         type: String,
         enum: ["borrowed", "returned"],
         default: "borrowed",
      },
      borrowedAt: {
         type: Date,
         default: Date.now,
      },
   },
   {
      versionKey: false,
   }
);

export const Borrow = mongoose.model("Borrow", borrowSchema);
