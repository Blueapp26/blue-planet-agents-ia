import express from 'express';
import RSS from 'rss';
import cors from 'cors'; // Ajoute ça pour que ton dashboard puisse lui parler
import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const table = base('Articles');

// Avant saveArticlesToDisk(), ajouter:
await table.create([{
  fields: {
    Title: newArticle.title,
    Description: newArticle.description,
    Latitude: newArticle.lat,
    Longitude: newArticle.lng,
    ImageUrl: newArticle.image_url,
    Category: newArticle.category,
    HtmlContent: newArticle.body_html,
  }
}]);


const app = express();
app.use(express.json());
app.use(cors()); 

interface Article {
  title: string;
  content: string;
  image_url: string;
  category: string;
  lat: string;
  lng: string;
  date: Date;
}

let articlesDB: Article[] = [];

// Route pour ALEXIS
app.post('/api/save-article', (req, res) => {
  const { title, body_html, image_url, category, lat, lng } = req.body;

  articlesDB.unshift({
    title,
    content: body_html,
    image_url,
    category,
    lat,
    lng,
    date: new Date()
  });

  console.log(`✅ Article reçu : ${title} (${category})`);
  res.status(200).send({ message: "OK" });
});

// Route pour GoodBarber
app.get('/rss', (req, res) => {
  const feed = new RSS({
    title: 'Blue Planet App Feed',
    description: 'Office de Tourisme Mondial',
    feed_url: 'https://blue-planet-dashboard--admin6741.replit.app/rss',
    site_url: 'https://blue-planet-dashboard--admin6741.replit.app',
    custom_namespaces: { 'georss': 'http://www.georss.org/georss' }
  });

  articlesDB.forEach(art => {
    feed.item({
      title: `[${art.category}] ${art.title}`,
      description: art.content,
      url: art.image_url,
      date: art.date,
      enclosure: { url: art.image_url, type: 'image/jpeg' },
      custom_elements: [{ 'georss:point': `${art.lat} ${art.lng}` }]
    });
  });

  res.set('Content-Type', 'text/xml');
  res.send(feed.xml());
});

app.listen(3001, () => console.log('🚀 Serveur API sur le port 3001'));