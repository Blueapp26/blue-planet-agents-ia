import express, { Request, Response } from "express";
import RSS from "rss";
import cors from "cors";

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

// ✅ ROUTE RSS (Doit être AVANT le catch-all React)
app.get("/rss", (req: Request, res: Response) => {
  try {
    const feed = new RSS({
      title: "Blue Planet App Feed",
      description: "Office de Tourisme Mondial",
      feed_url: "https://blue-planet-dashboard--admin6741.replit.app/rss",
      site_url: "https://blue-planet-dashboard--admin6741.replit.app",
      custom_namespaces: { georss: "http://www.georss.org/georss" },
    });

    articlesDB.forEach((art) => {
      feed.item({
        title: `[${art.category}] ${art.title}`,
        description: art.content,
        url: art.image_url,
        date: art.date,
        enclosure: { url: art.image_url, type: "image/jpeg" },
        custom_elements: [{ "georss:point": `${art.lat} ${art.lng}` }],
      });
    });

    res.set("Content-Type", "application/rss+xml; charset=utf-8");
    res.send(feed.xml());
  } catch (error) {
    console.error("❌ RSS Error:", error);
    res.status(500).json({ error: "RSS generation failed" });
  }
});

// ✅ HEALTH CHECK
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    articles: articlesDB.length,
    timestamp: new Date().toISOString(),
  });
});

// ✅ SAVE ARTICLE
app.post("/api/save-article", (req: Request, res: Response) => {
  try {
    const { title, body_html, image_url, category, lat, lng } = req.body;

    if (!title || !image_url) {
      return res.status(400).json({ error: "title et image_url requis" });
    }

    const newArticle: Article = {
      title,
      content: body_html || "",
      image_url,
      category: category || "Uncategorized",
      lat: lat?.toString() || "0",
      lng: lng?.toString() || "0",
      date: new Date(),
    };

    articlesDB.unshift(newArticle);

    // Si tu veux sauver en Airtable (optionnel):
    // await saveToAirtable(newArticle);

    console.log(`✅ Article reçu : ${title} (${category})`);
    res.status(200).json({
      message: "OK",
      articlesCount: articlesDB.length,
    });
  } catch (error) {
    console.error("❌ Save error:", error);
    res.status(500).json({ error: "Failed to save article" });
  }
});

// ✅ LIST ARTICLES
app.get("/api/articles", (req: Request, res: Response) => {
  res.json({
    count: articlesDB.length,
    articles: articlesDB,
  });
});

// ✅ DELETE ARTICLE
app.delete("/api/articles/:index", (req: Request, res: Response) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < articlesDB.length) {
    articlesDB.splice(index, 1);
    res.json({ message: "Deleted", count: articlesDB.length });
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

// ✅ STATIC FILES (si tu serves React depuis Express)
app.use(express.static("dist"));

// ✅ React CATCH-ALL (DOIT ÊTRE DERNIER!)
app.get("*", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/../dist/index.html");
});

// ✅ START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║ 🌍 BLUE PLANET SERVER STARTED          ║
╠════════════════════════════════════════╣
║ 🚀 Port: ${PORT}                       ║
║ 📡 RSS: http://localhost:${PORT}/rss   ║
║ 🏥 Health: http://localhost:${PORT}/health
║ 📊 Articles: http://localhost:${PORT}/api/articles
╚════════════════════════════════════════╝
  `);
});

// (Optionnel) Fonction Airtable si tu veux l'activer
/*
import Airtable from 'airtable';

async function saveToAirtable(article: Article) {
  try {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
      process.env.AIRTABLE_BASE_ID || ''
    );
    const table = base('Articles');

    await table.create([{
      fields: {
        Title: article.title,
        Description: article.content,
        Latitude: parseFloat(article.lat),
        Longitude: parseFloat(article.lng),
        ImageUrl: article.image_url,
        Category: article.category,
        HtmlContent: article.content,
      }
    }]);
  } catch (error) {
    console.error('Airtable save error:', error);
  }
}
*/
