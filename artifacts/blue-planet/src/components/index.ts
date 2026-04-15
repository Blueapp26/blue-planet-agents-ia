export { StatusBadge } from "./StatusBadge";
export { HealthBadge } from "./HealthBadge";
export { SectionHeader } from "./SectionHeader";
export { Card } from "./Card";
export { PoleCard } from "./PoleCard";
export { NavTab } from "./NavTab";
export { OverviewCard } from "./OverviewCard";
export { AlertItem } from "./AlertItem";
export { PriorityRow } from "./PriorityRow";
export { HistoryItem } from "./HistoryItem";


import express from 'express';
import RSS from 'rss';

const app = express();
app.use(express.json());

// Structure de l'article (pour correspondre à ce qu'Alexis envoie)
interface Article {
  title: string;
  content: string;
  image_url: string;
  lat: string;
  lng: string;
  date: Date;
}

// Stockage temporaire (Pour un stage, c'est suffisant. Pour la prod, utilise une DB)
let articlesDB: Article[] = [];

// --- ROUTE 1 : RECEPTION DEPUIS N8N (ALEXIS) ---
app.post('/api/save-article', (req, res) => {
  const { title, content, image_url, lat, lng } = req.body;

  const newArticle: Article = {
    title,
    content,
    image_url,
    lat,
    lng,
    date: new Date()
  };

  // On ajoute l'article en haut de la liste
  articlesDB.unshift(newArticle);

  console.log(`✅ Article reçu : ${title}`);
  res.status(200).send({ message: "Article archivé pour le flux RSS" });
});

// --- ROUTE 2 : GENERATION DU FLUX RSS POUR GOODBARBER ---
app.get('/rss', (req, res) => {
  const feed = new RSS({
    title: 'Blue Planet App - Office de Tourisme Mondial',
    description: 'Découvrez les merveilles du monde avec nos agents IA.',
    feed_url: 'https://votre-projet.replit.app/rss',
    site_url: 'https://votre-projet.replit.app',
    language: 'fr',
    custom_namespaces: {
      'georss': 'http://www.georss.org/georss' // Crucial pour le tri par distance
    }
  });

  articlesDB.forEach(article => {
    feed.item({
      title: article.title,
      description: article.content, // Contenu HTML de Léo
      url: article.image_url, // Lien vers l'image Cloudinary
      date: article.date,
      enclosure: { url: article.image_url, type: 'image/jpeg' }, // Important pour GoodBarber
      custom_elements: [
        { 'georss:point': `${article.lat} ${article.lng}` } // GÉOLOCALISATION
      ]
    });
  });

  res.set('Content-Type', 'text/xml');
  res.send(feed.xml({ indent: true }));
});

app.listen(3000, () => console.log('🚀 Serveur Blue Planet prêt sur le port 3000'));