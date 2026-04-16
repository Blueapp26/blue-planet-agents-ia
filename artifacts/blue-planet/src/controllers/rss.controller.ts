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

  generateFeedNear(req: Request, res: Response) {
    try {
      const geoloc = (req.params.geoloc || req.query.geoloc) as string;
      if (!geoloc) {
        return res.status(400).json({ error: 'geoloc parameter required' });
      }
      const [lat, lng] = geoloc.split(',').map(Number);
      const feed = service.generateFeedNear(lat, lng, 50);
      res.set('Content-Type', 'application/rss+xml; charset=utf-8');
      res.send(feed);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  generateFeedSearch(req: Request, res: Response) {
    try {
      const keywords = (req.params.keywords || req.query.keywords) as string;
      if (!keywords) {
        return res.status(400).json({ error: 'keywords parameter required' });
      }
      const feed = service.generateFeedSearch(keywords);
      res.set('Content-Type', 'application/rss+xml; charset=utf-8');
      res.send(feed);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}