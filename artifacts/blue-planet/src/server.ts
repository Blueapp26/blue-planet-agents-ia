import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ API ROUTES (avant les fichiers statiques)
app.use('/api', routes);

// ✅ SERVE REACT STATIC FILES
// Change le chemin: dist/public au lieu de dist/dist/public
app.use(express.static(path.join(__dirname, '../public')));

// ✅ React catch-all
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║ 🌍 BLUE PLANET SERVER STARTED          ║
╠════════════════════════════════════════╣
║ 🚀 Port: ${PORT}
║ 📡 API: https://20865a60-d8d6-43c0-a0ae-cec6c2ac609f-00-2tjj4q3zjf8x0.picard.replit.dev:5173/api
║ 📊 App: https://20865a60-d8d6-43c0-a0ae-cec6c2ac609f-00-2tjj4q3zjf8x0.picard.replit.dev:5173
╚════════════════════════════════════════╝
  `);
});

export default app;