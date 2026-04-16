export const createLocationHash = (lat: number, lng: number): string => {
  return `${lat.toFixed(4)}_${lng.toFixed(4)}`;
};

export const isDuplicate = (articles: any[], newArticle: any): boolean => {
  const hash = createLocationHash(newArticle.lat, newArticle.lng);
  return articles.some(a => a.location_hash === hash);
};

export const getCurrentDate = (): string => {
  return new Date().toISOString();
};