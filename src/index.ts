import { app, BrowserWindow } from 'electron';
import path from 'path';
import express from 'express';
import { Sequelize, Model, DataTypes } from 'sequelize';

let mainWindow: BrowserWindow | null = null;

// Create an instance of Express
const serverApp = express();
serverApp.use(express.json()); // Middleware to parse JSON bodies

// Configure Sequelize (replace with your database configuration)
const sequelize = new Sequelize({
  dialect: 'sqlite', // or 'mysql', 'postgres', etc.
  storage: 'database.sqlite', // Path to your SQLite database file
});

// Define Personnel model
class Personnel extends Model {}
Personnel.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobRole: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Personnel',
});

// Sync Sequelize models with the database
const startServer = async () => {
  try {
    await sequelize.sync(); // Sync Sequelize models with the database

    // Define API routes
    serverApp.get('/api/personnel', async (req, res) => {
      try {
        const personnel = await Personnel.findAll();
        res.json(personnel);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch personnel' });
      }
    });

    serverApp.post('/api/personnel', async (req, res) => {
      try {
        const { name, number, email, jobRole } = req.body;
        const newPersonnel = await Personnel.create({ name, number, email, jobRole });
        res.json(newPersonnel);
      } catch (error) {
        res.status(500).json({ error: 'Failed to add personnel' });
      }
    });

    serverApp.delete('/api/personnel/:id', async (req, res) => {
      try {
        const { id } = req.params;
        await Personnel.destroy({ where: { id } });
        res.json({ message: 'Personnel deleted' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete personnel' });
      }
    });

    // Start the Express server
    serverApp.listen(3001, () => {
      console.log('Server running on http://localhost:3001');
    });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Create the main Electron window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL(
    path.join(__dirname, '../pages/index.html')
  );

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  createWindow();
  startServer(); // Start the API server when the app is ready
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
