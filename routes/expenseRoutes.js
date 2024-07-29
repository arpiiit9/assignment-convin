import { downloadExpensePDF } from '../controllers/expenseController.js';
import express from 'express';
import {
  addExpenseEqual,
  addExpenseExact,
  addExpensePercentage,
  getIndividualExpenses,
  getOverallExpenses
} from '../controllers/expenseController.js';

import { validateUserInput, validateExpenseInput } from '../middleware/validateInputs.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/expenses/equal', authenticateJWT, validateExpenseInput, addExpenseEqual);
router.post('/expenses/exact',  validateExpenseInput, addExpenseExact);
router.post('/expenses/percentage', authenticateJWT, validateExpenseInput, addExpensePercentage);
router.get('/expenses/user/:email', authenticateJWT, validateUserInput, getIndividualExpenses);
router.get('/expenses', authenticateJWT, getOverallExpenses);
router.get('/expenses/:id/pdf', downloadExpensePDF);

export default router;  