import { Document } from "mongoose";

export interface ShoppingItem extends Document {
  _id?: string;
  name: string;
  bought: boolean;
  createdAt?: Date;
}
