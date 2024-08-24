// src/server.ts

import express from 'express';
import { schoolRoutes } from './routes/schoolRoutes';
import { classRoutes } from './routes/classRoutes';
import { teacherRoutes } from './routes/teacherRoutes';
import { studentRoutes } from './routes/studentRoutes';
import { coordinatorRoutes } from './routes/coordinatorRoutes';
import { managerRoutes } from './routes/managerRoutes';

const app = express();
app.use(express.json());

app.use('/schools', schoolRoutes);
app.use('/classes', classRoutes);
app.use('/teachers', teacherRoutes);
app.use('/students', studentRoutes);
app.use('/coordinators', coordinatorRoutes);
app.use('/managers', managerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
