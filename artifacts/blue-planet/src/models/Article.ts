export interface Article {
  id: string;
  title: string;
  description: string;
  body_html: string;
  lat: number;
  lng: number;
  image_url: string;
  category: string;
  created_at: string;
  location_hash: string;
}