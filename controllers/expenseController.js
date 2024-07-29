import Expense from '../models/Expense.js';
import PDFDocument from 'pdfkit';



export const addExpenseEqual = async (req, res) => {
  const { description, totalAmount, friends } = req.body;

  if (!totalAmount || !friends || friends.length === 0) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const equalAmount = totalAmount / friends.length;
  friends.forEach(friend => {
    friend.amountOwed = equalAmount;
  });

  const newExpense = new Expense({
    description,
    totalAmount,
    friends
  });

  try {
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add expense' });
  }
};


export const addExpenseExact = async (req, res) => {
  const { description, totalAmount, friends, amounts } = req.body;

  if (!totalAmount || !friends || friends.length === 0 || !amounts || amounts.length !== friends.length) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  friends.forEach((friend, index) => {
    friend.amountOwed = amounts[index];
  });

  const newExpense = new Expense({
    description,
    totalAmount,
    friends
  });

  try {
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add expense' });
  }
};

// Add expense and specify percentage each participant owes
export const addExpensePercentage = async (req, res) => {
  const { description, totalAmount, friends, percentages } = req.body;

  if (!totalAmount || !friends || friends.length === 0 || !percentages || percentages.length !== friends.length) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const totalPercentage = percentages.reduce((sum, percentage) => sum + percentage, 0);
  if (totalPercentage !== 100) {
    return res.status(400).json({ error: 'Percentages must add up to 100%' });
  }

  friends.forEach((friend, index) => {
    friend.amountOwed = (percentages[index] / 100) * totalAmount;
  });

  const newExpense = new Expense({
    description,
    totalAmount,
    friends
  });

  try {
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add expense' });
  }
};

// Retrieve individual user expenses
export const getIndividualExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ 'friends.email': req.params.email });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve expenses' });
  }
};

// Retrieve overall expenses
export const getOverallExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve expenses' });
  }
};

import PDFDocument from 'pdfkit';
import { Response } from 'express';
import Expense from '../models/Expense.js'; // Adjust the path to your Expense model

export const downloadExpensePDF = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you pass the expense ID in the route parameters

    // Fetch the expense from the database
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    // Create a new PDF document
    const doc = new PDFDocument();

    // Set response headers to download the PDF
    res.setHeader('Content-disposition', 'attachment; filename=expense.pdf');
    res.setHeader('Content-type', 'application/pdf');

    // Pipe the PDF document to the response
    doc.pipe(res);

    // Add content to the PDF
    doc.fontSize(16).text('Expense Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Description: ${expense.description}`);
    doc.text(`Total Amount: $${expense.totalAmount}`);
    doc.text('Friends:');
    expense.friends.forEach((friend, index) => {
      doc.text(`${index + 1}. ${friend.name} owes $${friend.amountOwed}`);
    });

    // Finalize the PDF and end the stream
    doc.end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
};



