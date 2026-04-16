import { articles } from '../models/articles-store';
import { createLocationHash, isDuplicate } from '../utils/helpers';

export class ArticlesService {
  getAllArticles() {
    return articles;
  }

  saveArticle(data: any) {
    // Vérifier les doublons
    if (isDuplicate(articles, data)) {
      throw new Error('Article déjà existe (même localisation)');
    }

    const newArticle = {
      id: `article_${Date.now()}`,
      title: data.title,
      body_html: data.body_html,
      lat: data.lat,
      lng: data.lng,
      image_url: data.image_url,
      category: data.category || 'Uncategorized',
      created_at: new Date().toISOString(),
      location_hash: createLocationHash(data.lat, data.lng)
    };

    articles.push(newArticle);
    return newArticle;
  }

  deleteArticle(index: number) {
    if (index < 0 || index >= articles.length) {
      throw new Error('Article not found');
    }
    const deleted = articles.splice(index, 1);
    return deleted[0];
  }
}