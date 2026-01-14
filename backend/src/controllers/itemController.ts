import { Request, Response } from 'express';
import { ShoppingItemModel } from '../models/shoppingItem.model';
import { ShoppingItem } from '../models/shoppingItem';

// --- 1. POST /items: Neues Item hinzufügen ---
interface CreateItemBody {
  name: string;
}

export const createItem = async (
  req: Request<{}, {}, CreateItemBody>,
  res: Response
) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send('Name is required.');
    }
    
    const newItem: ShoppingItem = new ShoppingItemModel({ name }); 
    await newItem.save();
    return res.status(201).json(newItem); // ⬅️ return hinzugefügt
  } catch (error) {
    return res.status(500).send('Server Error while creating item.'); // ⬅️ return hinzugefügt
  }
};

// --- 2. GET /items: Alle Items zurückgeben ---
export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items: ShoppingItem[] = await ShoppingItemModel.find();
    return res.json(items); // ⬅️ return hinzugefügt
  } catch (error) {
    return res.status(500).send('Server Error while fetching items.'); // ⬅️ return hinzugefügt
  }
};

// --- 3. PUT /items/:id: Status (bought) aktualisieren ---
interface UpdateItemBody {
    bought: boolean; 
}

export const updateItemStatus = async (
  req: Request<{ id: string }, {}, UpdateItemBody>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { bought } = req.body;

    if (typeof bought !== 'boolean') {
        return res.status(400).send('A valid "bought" status (boolean) is required.');
    }
    
    const updatedItem = await ShoppingItemModel.findByIdAndUpdate(
      id,
      { bought }, 
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).send('Item not found.');
    }

    return res.json(updatedItem); // ⬅️ return hinzugefügt
  } catch (error) {
    return res.status(500).send('Server Error while updating item.'); // ⬅️ return hinzugefügt
  }
};

// --- 4. DELETE /items/:id: Item löschen ---
export const deleteItem = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const deletedItem = await ShoppingItemModel.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).send('Item not found.');
    }

    return res.status(204).send(); // ⬅️ return hinzugefügt
  } catch (error) {
    return res.status(500).send('Server Error while deleting item.'); // ⬅️ return hinzugefügt
  }
};