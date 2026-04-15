const express = require("express");
const RSS = require("rss");
const cors = require("cors");

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

let articlesDB = [];

// ✅ ROUTE RSS
app.get("/rss", (req, res) => {
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
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    articles: articlesDB.length,
    timestamp: new Date().toISOString(),
  });
});

// ✅ SAVE ARTICLE
app.post("/api/save-article", (req, res) => {
  try {
    const { title, body_html, image_url, category, lat, lng } = req.body;

    if (!title || !image_url) {
      return res.status(400).json({ error: "title et image_url requis" });
    }

    const newArticle = {
      title,
      content: body_html || "",
      image_url,
      category: category || "Uncategorized",
      lat: lat?.toString() || "0",
      lng: lng?.toString() || "0",
      date: new Date(),
    };

    articlesDB.unshift(newArticle);

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
app.get("/api/articles", (req, res) => {
  res.json({
    count: articlesDB.length,
    articles: articlesDB,
  });
});

// ✅ DELETE ARTICLE
app.delete("/api/articles/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < articlesDB.length) {
    articlesDB.splice(index, 1);
    res.json({ message: "Deleted", count: articlesDB.length });
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

// ✅ START SERVER
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║ 🌍 BLUE PLANET SERVER STARTED          ║
╠════════════════════════════════════════╣
║ 🚀 Port: ${PORT}
║ 📡 RSS: http://localhost:${PORT}/rss
║ 🏥 Health: http://localhost:${PORT}/health
║ 📊 Articles: http://localhost:${PORT}/api/articles
╚════════════════════════════════════════╝
  `);
});
