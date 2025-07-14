import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js'    ;
import  adminRouter  from './Routes/adminRoutes.js';
import blogRouter from './Routes/blogRoutes.js';

const app = express();
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app for testing or further configuration
export default app;
