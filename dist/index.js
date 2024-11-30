"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
let mainWindow = null;
// Create an instance of Express
const serverApp = (0, express_1.default)();
serverApp.use(express_1.default.json()); // Middleware to parse JSON bodies
// Configure Sequelize (replace with your database configuration)
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite', // or 'mysql', 'postgres', etc.
    storage: 'database.sqlite', // Path to your SQLite database file
});
// Define Personnel model
class Personnel extends sequelize_1.Model {
}
Personnel.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    jobRole: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Personnel',
});
// Sync Sequelize models with the database
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.sync(); // Sync Sequelize models with the database
        // Define API routes
        serverApp.get('/api/personnel', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const personnel = yield Personnel.findAll();
                res.json(personnel);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to fetch personnel' });
            }
        }));
        serverApp.post('/api/personnel', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { name, number, email, jobRole } = req.body;
                const newPersonnel = yield Personnel.create({ name, number, email, jobRole });
                res.json(newPersonnel);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to add personnel' });
            }
        }));
        serverApp.delete('/api/personnel/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield Personnel.destroy({ where: { id } });
                res.json({ message: 'Personnel deleted' });
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to delete personnel' });
            }
        }));
        // Start the Express server
        serverApp.listen(3001, () => {
            console.log('Server running on http://localhost:3001');
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
// Create the main Electron window
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path_1.default.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });
    mainWindow.loadURL(path_1.default.join(__dirname, '../pages/welcome.html'));
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
electron_1.app.on('ready', () => {
    createWindow();
    startServer(); // Start the API server when the app is ready
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
