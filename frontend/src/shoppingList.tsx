import { useState } from "react";
import type { ShoppingItem } from "./models/shoppingItem";
// import './App.css'

function ShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  return <>
  <h1>Meine Einkaufsliste</h1>
  </>;
}

export default ShoppingList;
