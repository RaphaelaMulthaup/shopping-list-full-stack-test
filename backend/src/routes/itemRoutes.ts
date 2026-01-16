import express, { Router } from 'express';
import {
  getAllItems,
  createItem,
  updateItemStatus,
  validateBoughtStatus,
  deleteItem,
} from '../controllers/itemController';

const router: Router = express.Router();

// get all items
router.get('/', getAllItems);

// Add a new item
router.post('/', createItem);

// Update the status of an item
router.put('/:id', validateBoughtStatus, updateItemStatus);

// Delete an item
router.delete('/:id', deleteItem);

export default router;