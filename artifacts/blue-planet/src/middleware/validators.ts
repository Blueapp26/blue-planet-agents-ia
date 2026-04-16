import { Request, Response, NextFunction } from 'express';

export const validateArticle = (req: Request, res: Response, next: NextFunction) => {
  const { title, body_html, image_url, lat, lng } = req.body;

  if (!title || !image_url) {
    return res.status(400).json({ error: 'title et image_url requis' });
  }

  if (!lat || !lng) {
    return res.status(400).json({ error: 'lat et lng requis' });
  }

  next();
};