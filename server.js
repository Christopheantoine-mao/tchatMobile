import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

// Aide pour définir __filename et __dirname dans les modules ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('un utilisateur s\'est connecté');

  // Gérer les déconnexions
  socket.on('disconnect', () => {
    console.log('utilisateur déconnecté');
  });

  // Gérer les messages de chat
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

const port = process.env.PORT || 3000; // Vous pouvez changer le port ici si nécessaire
server.listen(port, () => {
  console.log(`Serveur fonctionnant à http://localhost:${port}/`);
});
