import { Request, Response } from 'express';
import { KmlService } from '../services/kml.service';

const service = new KmlService();

export class KmlController {
  generateKml(req: Request, res: Response) {
    try {
      const kml = service.generateKml();
      res.set('Content-Type', 'application/vnd.google-earth.kml+xml; charset=utf-8');
      res.send(kml);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}