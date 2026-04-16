import express from 'express';
import { RssController } from '../controllers/rss.controller';

const router = express.Router();
const controller = new RssController();

router.get('', (req, res) => controller.generateFeed(req, res));

export default router;