import { useState, useEffect } from "react";
import type { ShoppingItem } from "./models/shoppingItem";
import { Container } from "@mui/material";
import ItemList from "./components/ItemList";
import AddItemForm from "./components/AddItemForm";
import "./App.css";

function App() {
  const [items, setItems] = useState<ShoppingItem[]>([]);

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/items");
      if (!response.ok) {
        throw new Error("Error retrieving data from the server.");
      }
      const data: ShoppingItem[] = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Could not load items:", error);
    }
  };

  const handleUpdateItem = async (item: ShoppingItem) => {
    try {
      const response = await fetch(`http://localhost:3000/items/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, bought: !item.bought }),
      });
      if (response.ok) {
        const updatedItem = await response.json();
        setItems((prevItems) =>
          prevItems.map((i) => (i._id === updatedItem._id ? updatedItem : i))
        );
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/items/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setItems((prevItems) => prevItems.filter((item) => item._id !== id));
      } else {
        console.error("Deletion on the server failed.");
      }
    } catch (error) {
      console.error("Network error during deletion:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Container className="main-container">
      <div className="list-upper-area">
        <h1>Meine Einkaufsliste</h1>
        <ItemList
          items={items}
          onToggle={handleUpdateItem}
          onDelete={handleDeleteItem}
        />
      </div>
      <AddItemForm onItemAdded={fetchItems} />
    </Container>
  );
}

export default App;
