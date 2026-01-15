import { Box, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { createShoppingItem } from '../services/itemService';

interface AddItemFormProps {
  /** Callback to refresh the list after a successful addition. */
  onItemAdded: () => void;
}

/**
 * A form component to add new items to the shopping list.
 * Features Material UI components and basic validation.
 */
const AddItemForm: React.FC<AddItemFormProps> = ({ onItemAdded }) => {
  const [name, setName] = useState("");

  /**
   * Handles form submission: validates, saves, and resets.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await createShoppingItem(name);
      setName("");
      onItemAdded();
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 2, mb: 4, mt: 2 }}
    >
      <TextField
        fullWidth
        label="Was möchtest du kaufen?"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button variant="contained" type="submit" disabled={!name.trim()}>
        <AddIcon fontSize="large" />
      </Button>
    </Box>
  );
};

export default AddItemForm;
