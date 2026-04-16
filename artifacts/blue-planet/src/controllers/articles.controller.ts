import { Request, Response } from 'express';
import { ArticlesService } from '../services/articles.service';

const service = new ArticlesService();

export class ArticlesController {
  saveArticle(req: Request, res: Response) {
    try {
      const result = service.saveArticle(req.body);
      res.json({ message: 'OK', articlesCount: service.getAllArticles().length });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  listArticles(req: Request, res: Response) {
    try {
      const articles = service.getAllArticles();
      res.json({ count: articles.length, articles });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  deleteArticle(req: Request, res: Response) {
    try {
      const index = parseInt(req.params.index);
      const deleted = service.deleteArticle(index);
      res.json({ message: 'Deleted', count: service.getAllArticles().length });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}