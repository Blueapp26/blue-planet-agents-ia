import RSS from 'rss';
import { articles } from '../models/data';

export class RssService {
  generateFeed() {
    const feed = new RSS({
      title: 'Blue Planet App Feed',
      description: 'Office de Tourisme Mondial',
      feed_url: 'https://blue-planet-dashboard--admin6741.replit.app/api/rss',
      site_url: 'https://blue-planet-dashboard--admin6741.replit.app',
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
}