import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Middleware
app.use(express.json()); // Middleware to parse JSON
app.use(express.urlencoded({ extended: true })); 

// Routes
app.use('/api', userRoutes);
app.use('/api', expenseRoutes);


// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });