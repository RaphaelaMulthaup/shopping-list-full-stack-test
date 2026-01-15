import React from "react";
import type { ShoppingItem } from "../models/shoppingItem";
import { List, Typography } from "@mui/material";
import ShoppingListItem from "./ShoppingListItem";
import "./ItemList.css";

interface ItemListProps {
  /** Array of shopping items to be displayed. */
  items: ShoppingItem[];
  /** Callback function to toggle the 'bought' status of an item. */
  onToggle: (item: ShoppingItem) => void;
  /** Callback function to delete an item by its unique ID. */
  onDelete: (id: string) => void;
}

/**
 * Component that renders a scrollable list of shopping items.
 * Shows a placeholder message if the list is empty.
 * * @param {ItemListProps} props - The component props.
 * @returns {JSX.Element} The rendered list or a empty-state message.
 */
const ItemList: React.FC<ItemListProps> = ({ items, onToggle, onDelete }) => {
  if (items.length === 0) {
    return (
      <Typography variant="body1" sx={{ mt: 4, color: "text.secondary" }}>
        Deine Liste ist noch leer! Füge deinen ersten Artikel hinzu.
      </Typography>
    );
  }

  return (
    <List className="item-list">
      {items.map((item) => (
        <ShoppingListItem
          key={item._id}
          item={item}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </List>
  );
};

export default ItemList;
