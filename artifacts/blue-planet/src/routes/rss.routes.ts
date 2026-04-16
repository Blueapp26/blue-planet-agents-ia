import express from 'express';
import { RssController } from '../controllers/rss.controller';

const router = express.Router();
const controller = new RssController();

// Route RSS sans filtre
router.get('', (req, res) => {
  const geoloc = req.query.geoloc;
  const keywords = req.query.keywords;

  if (geoloc) {
    controller.generateFeedNear(req, res);
  } else if (keywords) {
    controller.generateFeedSearch(req, res);
  } else {
    controller.generateFeed(req, res);
  }
});

// Routes classiques
router.get('/near/:geoloc', (req, res) => controller.generateFeedNear(req, res));
router.get('/search/:keywords', (req, res) => controller.generateFeedSearch(req, res));

export default router;