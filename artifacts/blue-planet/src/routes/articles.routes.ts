import express from 'express';
import { ArticlesController } from '../controllers/articles.controller';

const router = express.Router();
const controller = new ArticlesController();

router.post('/save-article', (req, res) => controller.saveArticle(req, res));
router.get('', (req, res) => controller.listArticles(req, res));
router.delete('/:index', (req, res) => controller.deleteArticle(req, res));

export default router;