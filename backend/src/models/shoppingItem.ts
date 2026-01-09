import { ObjectId } from "mongoose";

export interface ShoppingItem {
  _id: ObjectId;
  name: string;
  bought: boolean;
  createdAt: Date;
}
