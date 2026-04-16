import { Request, Response } from 'express';
import { ArticlesService } from '../services/articles.service';

const service = new ArticlesService();

export class HealthController {
  check(req: Request, res: Response) {
    res.json({
      status: 'ok',
      articles: service.getAllArticles().length,
      timestamp: new Date().toISOString()
    });
  }
}