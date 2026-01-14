import React from 'react';
import type { ShoppingItem } from '../models/shoppingItem';
import { List } from '@mui/material';
import ShoppingListItem from './ShoppingListItem'; 

interface ItemListProps {
  items: ShoppingItem[];
  onToggle: (item: ShoppingItem) => void;
  onDelete: (id: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onToggle, onDelete }) => {
  if (items.length === 0) {
    return <p>Deine Liste ist noch leer! Füge deinen ersten Artikel hinzu.</p>;
  }
    
  return (
    <List>
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