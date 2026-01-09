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
      // Wenn der Name fehlt, gib einen Fehler zurück
      return res.status(400).send('Name is required.');
    }
    
    // Verwende dein ShoppingItemModel
    const newItem: ShoppingItem = new ShoppingItemModel({ name }); 
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).send('Server Error while creating item.');
  }
};

// --- 2. GET /items: Alle Items zurückgeben ---
export const getAllItems = async (req: Request, res: Response) => {
  try {
    // Verwende dein ShoppingItemModel
    const items: ShoppingItem[] = await ShoppingItemModel.find();
    res.json(items);
  } catch (error) {
    res.status(500).send('Server Error while fetching items.');
  }
};

// --- 3. PUT /items/:id: Status (bought) aktualisieren ---
interface UpdateItemBody {
    bought: boolean; // Wir aktualisieren das Feld 'bought'
}

export const updateItemStatus = async (
  req: Request<{ id: string }, {}, UpdateItemBody>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { bought } = req.body; // Holt den neuen 'bought'-Wert

    // Typ-Check für 'bought'
    if (typeof bought !== 'boolean') {
        return res.status(400).send('A valid "bought" status (boolean) is required.');
    }
    
    const updatedItem = await ShoppingItemModel.findByIdAndUpdate(
      id,
      { bought }, // Aktualisiert das Feld 'bought'
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).send('Item not found.');
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(500).send('Server Error while updating item.');
  }
};

// --- 4. DELETE /items/:id: Item löschen ---
export const deleteItem = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    // Verwende dein ShoppingItemModel
    const deletedItem = await ShoppingItemModel.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).send('Item not found.');
    }

    res.status(204).send(); 
  } catch (error) {
    res.status(500).send('Server Error while deleting item.');
  }
};