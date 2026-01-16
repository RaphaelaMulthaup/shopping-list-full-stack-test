import { useState, useEffect } from "react";
import type { ShoppingItem } from "./models/shoppingItem";
import { Container } from "@mui/material";
import ItemList from "./components/ItemList";
import AddItemForm from "./components/AddItemForm";
import { getShoppingItems, updateShoppingItem, deleteShoppingItem } from "./services/itemService";
import "./App.css";

/**
 * Main Application Component.
 * Manages the global state of the shopping list and coordinates service calls.
 */
function App() {
  const [items, setItems] = useState<ShoppingItem[]>([]);

  /**
   * Fetches all items from the service and updates the local state.
   */
  const loadItems = async () => {
    try {
      const data = await getShoppingItems();
      setItems(data);
    } catch (error) {
      console.error("Could not load items:", error);
    }
  };

  /**
   * Toggles the 'bought' status of an item via the service.
   * @param {ShoppingItem} item - The item to be updated.
   */
  const handleToggle = async (item: ShoppingItem) => {
    try {
      const updatedItem = await updateShoppingItem(item._id, { ...item, bought: !item.bought });
      setItems((prev) => prev.map((i) => (i._id === updatedItem._id ? updatedItem : i)));
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  /**
   * Removes an item via the service and updates the state.
   * @param {string} id - Unique ID of the item to delete.
   */
  const handleDelete = async (id: string) => {
    try {
      await deleteShoppingItem(id);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Deletion failed:", error);
    }
  };

  // Initial load
  useEffect(() => {
    loadItems();
  }, []);

  return (
    <Container className="main-container">
      <div className="list-upper-area">
        <h1>Meine Einkaufsliste</h1>
        <ItemList
          items={items}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </div>
      <AddItemForm onItemAdded={loadItems} />
    </Container>
  );
}

export default App;