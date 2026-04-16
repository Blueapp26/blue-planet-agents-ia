import express from 'express';
import { KmlController } from '../controllers/kml.controller';

const router = express.Router();
const controller = new KmlController();

router.get('', (req, res) => controller.generateKml(req, res));

export default router;