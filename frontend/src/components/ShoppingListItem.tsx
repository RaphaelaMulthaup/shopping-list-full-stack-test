import React from 'react';
import type { ShoppingItem } from '../models/shoppingItem'; 
import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

interface ShoppingListItemProps {
  item: ShoppingItem;
  onToggle: (item: ShoppingItem) => void;
}

const ShoppingListItem: React.FC<ShoppingListItemProps> = ({ item, onToggle }) => {
  const labelId = `checkbox-list-label-${item._id}`;

  return (
    <ListItem
      key={item._id}
      disablePadding
    >
      <ListItemButton
        role="listitem"
        onClick={() => onToggle(item)}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={item.bought} 
            tabIndex={-1}
            disableRipple
            slotProps={{ 
                input: { 'aria-labelledby': labelId } 
            }}
          />
        </ListItemIcon>
        
        <ListItemText 
          id={labelId} 
          primary={item.name}
          sx={{ textDecoration: item.bought ? 'line-through' : 'none', color: item.bought ? 'gray' : 'inherit' }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default ShoppingListItem;