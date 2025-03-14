import { ManageIngredientsUseCaseImpl } from "./../manage-ingredients.usecase";
import { Ingredient } from "../../entities/ingredient";
import { of } from "rxjs";

// Mock repository implementation
const mockRepository = {
  observeIngredients: jest.fn(),
  addIngredients: jest.fn(),
  removeIngredient: jest.fn(),
  getIngredients: jest.fn(),
};

// Mock container.get
jest.mock("../../../../core/di/container", () => ({
  container: {
    get: jest.fn().mockImplementation(() => mockRepository),
  },
}));

describe("ManageIngredientsUseCaseImpl", () => {
  let useCase: ManageIngredientsUseCaseImpl;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    useCase = new ManageIngredientsUseCaseImpl();
  });

  describe("observeIngredients", () => {
    it("should call repository observeIngredients", () => {
      const ingredients: Ingredient[] = [{ id: "1", name: "Tomato" }];
      mockRepository.observeIngredients.mockReturnValue(of(ingredients));

      const result$ = useCase.observeIngredients();

      result$.subscribe((result) => {
        expect(result).toEqual(ingredients);
        expect(mockRepository.observeIngredients).toHaveBeenCalled();
      });
    });
  });

  describe("addIngredients", () => {
    it("should parse single ingredient and call repository", () => {
      const ingredients: Ingredient[] = [{ id: "1", name: "Tomato" }];
      mockRepository.addIngredients.mockReturnValue(ingredients);

      const result = useCase.addIngredients("Tomato");

      expect(result).toEqual(ingredients);
      expect(mockRepository.addIngredients).toHaveBeenCalledWith(["Tomato"]);
    });

    it("should parse multiple ingredients and call repository", () => {
      const ingredients: Ingredient[] = [
        { id: "1", name: "Tomato" },
        { id: "2", name: "Onion" },
      ];
      mockRepository.addIngredients.mockReturnValue(ingredients);

      const result = useCase.addIngredients("Tomato,Onion");

      expect(result).toEqual(ingredients);
      expect(mockRepository.addIngredients).toHaveBeenCalledWith([
        "Tomato",
        "Onion",
      ]);
    });

    it("should handle empty string input", () => {
      mockRepository.addIngredients.mockReturnValue([]);

      const result = useCase.addIngredients("");

      expect(result).toEqual([]);
      expect(mockRepository.addIngredients).toHaveBeenCalledWith([""]);
    });

    it("should trim whitespace from ingredients", () => {
      const ingredients: Ingredient[] = [{ id: "1", name: "Tomato" }];
      mockRepository.addIngredients.mockReturnValue(ingredients);

      const result = useCase.addIngredients(" Tomato , Onion ");

      expect(result).toEqual(ingredients);
      expect(mockRepository.addIngredients).toHaveBeenCalledWith([
        "Tomato",
        "Onion",
      ]);
    });
  });

  describe("removeIngredient", () => {
    it("should call repository removeIngredient", () => {
      useCase.removeIngredient("1");
      expect(mockRepository.removeIngredient).toHaveBeenCalledWith("1");
    });
  });

  describe("getIngredients", () => {
    it("should call repository getIngredients", () => {
      const ingredients: Ingredient[] = [{ id: "1", name: "Tomato" }];
      mockRepository.getIngredients.mockReturnValue(ingredients);

      const result = useCase.getIngredients();

      expect(result).toEqual(ingredients);
      expect(mockRepository.getIngredients).toHaveBeenCalled();
    });
  });
});
