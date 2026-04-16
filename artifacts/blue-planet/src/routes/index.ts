import express from 'express';
import articlesRoutes from './articles.routes';
import rssRoutes from './rss.routes';
import healthRoutes from './health.routes';
import kmlRoutes from './kml.routes';

const router = express.Router();

router.use('/articles', articlesRoutes);
router.use('/rss', rssRoutes);
router.use('/health', healthRoutes);
router.use('/kml', kmlRoutes);

export default router;