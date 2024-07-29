import mongoose from 'mongoose';

const friendSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  amountOwed: { type: Number, default: 0 },
});

const expenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  friends: [friendSchema],
  createdAt: { type: Date, default: Date.now },
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
