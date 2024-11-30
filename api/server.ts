import express from 'express';
import sequelize from '../config/database';
import { Personnel } from '../models/personnel';

const app = express();
app.use(express.json());

app.get('/api/personnel', async (req, res) => {
  try {
    const personnel = await Personnel.findAll();
    res.json(personnel);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch personnel' });
  }
});

app.post('/api/personnel', async (req, res) => {
  try {
    const { name, number, email, jobRole } = req.body;
    const newPersonnel = await Personnel.create({ name, number, email, jobRole });
    res.json(newPersonnel);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add personnel' });
  }
});

app.delete('/api/personnel/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Personnel.destroy({ where: { id } });
    res.json({ message: 'Personnel deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete personnel' });
  }
});

const startServer = async () => {
  try {
    await sequelize.sync(); // Sync models with database
    app.listen(3001, () => {
      console.log('Server running on http://localhost:3001');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
