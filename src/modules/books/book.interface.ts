import { Types } from "mongoose";

export interface IBook {
   title: string;
   author: string;
   genre: string;
   description: string;
   copies: number;
   available: boolean;
   isbn?: string;
   // Optional field for ISBN
}
