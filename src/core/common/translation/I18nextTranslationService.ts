import { injectable } from "inversify";
import { TranslationService } from "./TranslationService";
import i18n from "./i18n";

@injectable()
export class I18nextTranslationService implements TranslationService {
  t(key: string, params?: Record<string, any>): string {
    return i18n.t(key, params);
  }
}
