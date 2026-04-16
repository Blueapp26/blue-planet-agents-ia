export * from '../models/Article';

// Autres types si besoin
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};