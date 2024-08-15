import express from 'express';
import schoolRoutes from './routes/schoolRoutes';

const app = express();

// Middleware para processar JSON
app.use(express.json());

// Usar as rotas da escola
app.use('/api', schoolRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

