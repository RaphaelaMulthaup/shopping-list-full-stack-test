import type { ShoppingItem } from "../models/shoppingItem";

// Central API URL - In a production environment, this would come from an environment variable.//
const API_URL = "http://localhost:3000/items";

/**
 * Fetches all shopping items from the backend.
 * @returns {Promise<ShoppingItem[]>} A promise that resolves to the array of items.
 * @throws {Error} If the server response is not successful.
 */
export const getShoppingItems = async (): Promise<ShoppingItem[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch items from the server.");
  return response.json();
};

/**
 * Creates a new shopping item in the database.
 * @param {string} name - The name of the item to create.
 * @returns {Promise<ShoppingItem>} The newly created item object.
 */
export const createShoppingItem = async (
  name: string
): Promise<ShoppingItem> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) throw new Error("Failed to create item.");
  return response.json();
};

/**
 * Updates an existing item (e.g., toggling the 'bought' status).
 * @param {string} id - The unique ID of the item.
 * @param {Partial<ShoppingItem>} updates - The fields to be updated.
 * @returns {Promise<ShoppingItem>} The updated item object.
 */
export const updateShoppingItem = async (
  id: string,
  updates: Partial<ShoppingItem>
): Promise<ShoppingItem> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error("Failed to update item.");
  return response.json();
};

/**
 * Deletes a shopping item from the backend.
 * @param {string} id - The unique ID of the item to be removed.
 * @returns {Promise<void>} Resolves when the deletion is successful.
 */
export const deleteShoppingItem = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete item.");
};
