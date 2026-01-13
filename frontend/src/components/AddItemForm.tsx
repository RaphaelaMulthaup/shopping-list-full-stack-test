import { Box, TextField, Button } from '@mui/material';
import React, { useState } from 'react';

interface AddItemFormProps {
  onItemAdded: () => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onItemAdded }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      const response = await fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        setName('');
        onItemAdded();
      }
    } catch (error) {
      console.error('Netzwerkfehler:', error);
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ display: 'flex', gap: 2, mb: 4, mt: 2 }}
    >
      <TextField
        fullWidth
        label="Was möchtest du kaufen?"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button 
        variant="contained" 
        type="submit"
        disabled={!name.trim()}
      >
        Hinzufügen
      </Button>
    </Box>
  );
};

export default AddItemForm;