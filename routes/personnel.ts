import { Router } from 'express';
import { Personnel } from '../models/personnel';

const router = Router();

// Get all personnel
router.get('/api/personnel', async (req, res) => {
    try {
        const personnel = await Personnel.findAll();
        res.json(personnel);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch personnel' });
    }
});

// Add new personnel
router.post('/api/personnel', async (req, res) => {
    try {
        const { name, number, email, jobRole } = req.body;
        const newPersonnel = await Personnel.create({ name, number, email, jobRole });
        res.json(newPersonnel);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add personnel' });
    }
});

// Delete personnel by ID
router.delete('/api/personnel/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Personnel.destroy({ where: { id } });
        res.json({ message: 'Personnel deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete personnel' });
    }
});

export default router;
