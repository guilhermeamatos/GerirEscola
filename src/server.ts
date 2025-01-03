import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { schoolRoutes } from './routes/schoolRoutes';
import { classRoutes } from './routes/classRoutes';
import { teacherRoutes } from './routes/teacherRoutes';
import { studentRoutes } from './routes/studentRoutes';
import { coordinatorRoutes } from './routes/coordinatorRoutes';
import { managerRoutes } from './routes/managerRoutes';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors());  

// Configurações do Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'School Management API',
      description: 'API para gestão escolar',
      version: '1.0.0',
      contact: {
        name: 'Seu Nome',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Servidor de Desenvolvimento',
        },
      ],
    },
  },
  apis: ['./src/routes/*.ts'], // Define o caminho para suas rotas que contém as anotações do Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Configuração do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas da aplicação
app.use('/api/schools', schoolRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/coordinators', coordinatorRoutes);
app.use('/api/managers', managerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
export { app };