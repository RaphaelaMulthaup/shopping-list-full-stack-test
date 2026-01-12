import { Document } from "mongoose";

export interface ShoppingItem extends Document {
  name: string;
  bought: boolean;
}
