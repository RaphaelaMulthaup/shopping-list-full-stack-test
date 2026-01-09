import { Schema, model } from 'mongoose';
import { ShoppingItem } from './shoppingItem';

const ShoppingItemSchema = new Schema<ShoppingItem>({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  bought: {
    type: Boolean,
    required: true,
    default: false
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export const ShoppingItemModel = model<ShoppingItem>('ShoppingItem', ShoppingItemSchema);