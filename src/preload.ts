// preload.ts
import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('api', {
  // Define API methods here
});
