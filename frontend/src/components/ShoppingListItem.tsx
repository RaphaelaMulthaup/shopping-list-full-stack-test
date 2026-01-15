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
  item: ShoppingItem;
  onToggle: (item: ShoppingItem) => void;
  onDelete: (id: string) => void;
}

const ShoppingListItem: React.FC<ShoppingListItemProps> = ({
  item,
  onToggle,
  onDelete,
}) => {
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
