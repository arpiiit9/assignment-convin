import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://arpittrivedi099:fLeqXKsDmRI9SMgD@cluster0.j6wwfjy.mongodb.net/")
      
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
