export interface TranslationService {
  t: (key: string, params?: Record<string, any>) => string;
}
