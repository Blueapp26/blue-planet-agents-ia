import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', routes);

// Serve React static files (LAST)
app.use(express.static('dist'));
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/../dist/index.html');
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║ 🌍 BLUE PLANET SERVER STARTED          ║
╠════════════════════════════════════════╣
║ 🚀 Port: ${PORT}
║ 📡 RSS: http://localhost:${PORT}/api/rss
║ 📊 Articles: http://localhost:${PORT}/api/articles
╚════════════════════════════════════════╝
  `);
});

export default app;