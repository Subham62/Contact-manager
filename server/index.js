import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import contactRoutes from './routes/contactRoute.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());  
app.use(express.json()); 

app.use('/api/contacts', contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
