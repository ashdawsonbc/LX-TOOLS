"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// preload.ts
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('api', {
// Define API methods here
});
