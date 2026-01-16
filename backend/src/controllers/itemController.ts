import { NextFunction, Request, Response } from "express";
import { ShoppingItemModel } from "../models/shoppingItem.model";
import { ShoppingItem } from "../models/shoppingItem";

/**
 * Interface for creating a new shopping item.
 */
interface CreateItemBody {
  name: string;
}

/**
 * Interface for updating the status of an existing shopping item.
 */
interface UpdateItemBody {
  bought: boolean;
}

/**
 * Higher-order function to catch errors in async express routes.
 * Removes the need for try-catch blocks in every controller.
 */
export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

/** Creates a new shopping item.
 * @param req - Express request with item name in the body.
 * @param res - Express response object.
 * @returns {Promise<Response>} 201 with the created item.
 */
export const createItem = asyncHandler(
  async (
    req: Request<{}, {}, CreateItemBody>,
    res: Response
  ): Promise<Response> => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send("Name is required.");
    }

    const newItem = new ShoppingItemModel({ name });
    await newItem.save();
    return res.status(201).json(newItem);
  }
);

/**
 * Retrieves all shopping items from the database.
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns {Promise<Response>} 200 with an array of items.
 */
export const getAllItems = asyncHandler(
  async (_req: Request, res: Response): Promise<Response> => {
    const items: ShoppingItem[] = await ShoppingItemModel.find();
    return res.json(items);
  }
);

/**
 * Middleware to validate that the 'bought' field is a boolean.
 * Added 'return' to next() to satisfy TypeScript's strict null checks.
 */
export const validateBoughtStatus = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (typeof req.body.bought !== "boolean") {
    return res.status(400).send('A valid "bought" status is required.');
  }
  return next();
};

/**
 * Updates the 'bought' status of a specific item by its ID.
 * * @param req - Express request object containing the item ID in params and the new bought status in the body.
 * @param res - Express response object.
 * @returns {Promise<Response>} A promise that resolves to the updated item JSON or a 404 error if not found.
 */
export const updateItemStatus = asyncHandler(
  async (
    req: Request<{ id: string }, {}, UpdateItemBody>,
    res: Response
  ): Promise<Response> => {
    const updatedItem = await ShoppingItemModel.findByIdAndUpdate(
      req.params.id,
      { bought: req.body.bought },
      { new: true }
    );

    return updatedItem
      ? res.json(updatedItem)
      : res.status(404).send("Item not found.");
  }
);

/**
 * Deletes a shopping item by its ID.
 * @param req - Express request with item ID in params.
 * @param res - Express response object.
 * @returns {Promise<Response>} 204 on success or 404 if not found.
 */
export const deleteItem = asyncHandler(
  async (req: Request<{ id: string }>, res: Response): Promise<Response> => {
    const { id } = req.params;
    const deletedItem = await ShoppingItemModel.findByIdAndDelete(id);

    return deletedItem
      ? res.status(204).send()
      : res.status(404).send("Item not found.");
  }
);
