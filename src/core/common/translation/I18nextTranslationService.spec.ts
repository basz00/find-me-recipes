import { I18nextTranslationService } from "./I18nextTranslationService";
import i18n from "./i18n";

jest.mock("./i18n");

describe("I18nextTranslationService", () => {
  let service: I18nextTranslationService;

  beforeEach(() => {
    service = new I18nextTranslationService();
    jest.clearAllMocks();
  });

  describe("t", () => {
    it("should call i18n.t with correct key", () => {
      const testKey = "addIngredients.title";
      service.t(testKey);
      expect(i18n.t).toHaveBeenCalledWith(testKey);
    });

    it("should return value from i18n.t", () => {
      const testKey = "addIngredients.title";
      const mockTranslation = "Mock Translation";
      (i18n.t as unknown as jest.Mock).mockReturnValue(mockTranslation);
      
      const result = service.t(testKey);
      expect(result).toBe(mockTranslation);
    });
  });
});