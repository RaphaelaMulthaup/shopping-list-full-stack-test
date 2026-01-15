import React from "react";
import type { ShoppingItem } from "../models/shoppingItem";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./ShoppingListItem.css";

interface ShoppingListItemProps {
  /** The shopping item object to be displayed. */
  item: ShoppingItem;
  /** Callback function to toggle the completion status of the item. */
  onToggle: (item: ShoppingItem) => void;
  /** Callback function to delete the item by its unique ID. */
  onDelete: (id: string) => void;
}

/**
 * A single item row within the shopping list.
 * Displays a checkbox for toggling status, the item name with ellipsis on overflow,
 * and a delete action button.
 * * @param {ShoppingListItemProps} props - The component props.
 * @returns {JSX.Element} The rendered list item.
 */
const ShoppingListItem: React.FC<ShoppingListItemProps> = ({
  item,
  onToggle,
  onDelete,
}) => {
  /** Unique ID for the accessibility labeling between checkbox and text. */
  const labelId = `checkbox-list-label-${item._id}`;

  return (
    <ListItem
      key={item._id}
      disablePadding
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => onDelete(item._id)}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemButton role="listitem" onClick={() => onToggle(item)}>
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
          slotProps={{
            primary: {
              noWrap: true,
              sx: {
                display: "block",
                textDecoration: item.bought ? "line-through" : "none",
                color: item.bought ? "gray" : "inherit",
              },
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default ShoppingListItem;
