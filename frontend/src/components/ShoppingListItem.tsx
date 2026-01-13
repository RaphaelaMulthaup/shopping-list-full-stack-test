import React from 'react';
import type { ShoppingItem } from '../models/shoppingItem'; 
import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

interface ShoppingListItemProps {
  item: ShoppingItem;
}

const ShoppingListItem: React.FC<ShoppingListItemProps> = ({ item }) => {
  const labelId = `checkbox-list-label-${item._id}`;

  return (
    <ListItem
      key={item._id}
      disablePadding
    >
      <ListItemButton
        role="listitem"
        // onClick={() => handleToggle(item)}
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
          sx={{ textDecoration: item.bought ? 'line-through' : 'none' }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default ShoppingListItem;