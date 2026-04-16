import { Request, Response } from 'express';
import { RssService } from '../services/rss.service';

const service = new RssService();

export class RssController {
  generateFeed(req: Request, res: Response) {
    try {
      const feed = service.generateFeed();
      res.set('Content-Type', 'application/rss+xml; charset=utf-8');
      res.send(feed);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}