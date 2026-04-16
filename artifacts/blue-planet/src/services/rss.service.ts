import RSS from 'rss';
import { articles } from '../models/articles-store';

export class RssService {
  generateFeed(): string {
    const feed = new RSS({
      title: 'Blue Planet App Feed',
      description: 'Office de Tourisme Mondial',
      feed_url: 'https://20865a60-d8d6-43c0-a0ae-cec6c2ac609f-00-2tjj4q3zjf8x0.picard.replit.dev:5173/api/rss',
      site_url: 'https://20865a60-d8d6-43c0-a0ae-cec6c2ac609f-00-2tjj4q3zjf8x0.picard.replit.dev:5173',
      custom_namespaces: { 'georss': 'http://www.georss.org/georss' }
    });

    articles.forEach(article => {
      feed.item({
        title: `[${article.category}] ${article.title}`,
        description: article.body_html,
        url: article.image_url,
        date: article.created_at,
        enclosure: { url: article.image_url, type: 'image/jpeg' },
        custom_elements: [{ 'georss:point': `${article.lat} ${article.lng}` }]
      });
    });

    return feed.xml();
  }

  generateFeedNear(userLat: number, userLng: number, radiusKm: number = 50): string {
    const feed = new RSS({
      title: 'Blue Planet App Feed',
      description: 'Office de Tourisme Mondial',
      feed_url: 'https://20865a60-d8d6-43c0-a0ae-cec6c2ac609f-00-2tjj4q3zjf8x0.picard.replit.dev:5173/api/rss',
      site_url: 'https://20865a60-d8d6-43c0-a0ae-cec6c2ac609f-00-2tjj4q3zjf8x0.picard.replit.dev:5173',
      custom_namespaces: { 'georss': 'http://www.georss.org/georss' }
    });

    const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371;
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    const nearbyArticles = articles.filter(article => {
      const distance = getDistance(userLat, userLng, article.lat, article.lng);
      return distance <= radiusKm;
    });

    nearbyArticles.forEach(article => {
      feed.item({
        title: `[${article.category}] ${article.title}`,
        description: article.body_html,
        url: article.image_url,
        date: article.created_at,
        enclosure: { url: article.image_url, type: 'image/jpeg' },
        custom_elements: [{ 'georss:point': `${article.lat} ${article.lng}` }]
      });
    });

    return feed.xml();
  }

  generateFeedSearch(keywords: string): string {
    const feed = new RSS({
      title: 'Blue Planet App Feed',
      description: 'Office de Tourisme Mondial',
      feed_url: 'https://20865a60-d8d6-43c0-a0ae-cec6c2ac609f-00-2tjj4q3zjf8x0.picard.replit.dev:5173/api/rss',
      site_url: 'https://20865a60-d8d6-43c0-a0ae-cec6c2ac609f-00-2tjj4q3zjf8x0.picard.replit.dev:5173',
      custom_namespaces: { 'georss': 'http://www.georss.org/georss' }
    });

    // Filtre par mots-clés (titre + contenu + catégorie)
    const searchTerm = keywords.toLowerCase();
    const searchResults = articles.filter(article => {
      return (
        article.title.toLowerCase().includes(searchTerm) ||
        article.body_html.toLowerCase().includes(searchTerm) ||
        article.category.toLowerCase().includes(searchTerm)
      );
    });

    searchResults.forEach(article => {
      feed.item({
        title: `[${article.category}] ${article.title}`,
        description: article.body_html,
        url: article.image_url,
        date: article.created_at,
        enclosure: { url: article.image_url, type: 'image/jpeg' },
        custom_elements: [{ 'georss:point': `${article.lat} ${article.lng}` }]
      });
    });

    return feed.xml();
  }
}