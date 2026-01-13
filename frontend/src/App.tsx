import { useState, useEffect } from "react";
import type { ShoppingItem } from "./models/shoppingItem";
import { Container } from "@mui/material";
import ItemList from "./components/ItemList";
// import './App.css'

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

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Container maxWidth="sm">
      <h1>Meine Einkaufsliste</h1>
      <ItemList items={items} />
    </Container>
  );
}

export default App;
