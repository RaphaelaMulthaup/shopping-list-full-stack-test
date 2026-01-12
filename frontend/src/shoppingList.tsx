import { useState, useEffect } from "react";
import type { ShoppingItem } from "./models/shoppingItem";
import {
  Checkbox,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// import './App.css'

function ShoppingList() {
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
    <>
      <h1>Meine Einkaufsliste</h1>
      <List>
        {items.map((item) => {
          const labelId = `checkbox-list-label-${item._id}`;

          return (
            <ListItemButton
              key={item._id}
              role="listitem"
              // onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={item.bought}
                  tabIndex={-1}
                  disableRipple
                  slotProps={{
                    input: { "aria-labelledby": labelId },
                  }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={item.name}
                sx={{ textDecoration: item.bought ? "line-through" : "none" }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </>
  );
}

export default ShoppingList;
