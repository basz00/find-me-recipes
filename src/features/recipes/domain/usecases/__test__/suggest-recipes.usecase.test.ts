import { of } from "rxjs";
import { SuggestRecipesUseCaseImpl } from "../suggest-recipes.usecase";
import { mapSpoonacularRecipeToRecipe } from "../../utils";
import { Recipe } from "../../entities/recipe";

const mockRepository = {
  suggestRecipes: jest.fn(),
  observeRecipes: jest.fn(),
};

jest.mock("@/core/di/container", () => ({
  container: {
    get: jest.fn().mockImplementation(() => mockRepository),
  },
}));

describe("SuggestRecipesUseCase", () => {
  let useCase: SuggestRecipesUseCaseImpl;

  beforeEach(() => {
    jest.clearAllMocks();

    useCase = new SuggestRecipesUseCaseImpl();
  });

  it("should call repository.suggestRecipes when execute is called", () => {
    const ingredients = ["tomato", "onion"];

    useCase.execute(ingredients);

    expect(mockRepository.suggestRecipes).toHaveBeenCalledWith(ingredients);
  });

  it("should return mapped recipes when observeRecipes is called", () => {
    const mockRecipes = [
      {
        id: 1,
        image: "test.jpg",
        imageType: "jpg",
        likes: 10,
        missedIngredientCount: 1,
        missedIngredients: [
          {
            aisle: "Produce",
            amount: 1,
            id: 2,
            image: "missed.jpg",
            meta: [],
            name: "Missed Ingredient",
            original: "1 Missed Ingredient",
            originalName: "Missed Ingredient",
            unit: "",
            unitLong: "",
            unitShort: "",
          },
        ],
        title: "Test Recipe",
        unusedIngredients: [],
        usedIngredientCount: 1,
        usedIngredients: [
          {
            aisle: "Produce",
            amount: 1,
            id: 1,
            image: "ing1.jpg",
            meta: [],
            name: "Ingredient 1",
            original: "1 Ingredient 1",
            originalName: "Ingredient 1",
            unit: "",
            unitLong: "",
            unitShort: "",
          },
        ],
      },
    ];

    const expectedRecipes = mockRecipes.map(mapSpoonacularRecipeToRecipe);
    mockRepository.observeRecipes.mockReturnValue(of(mockRecipes));

    let actualRecipes: Recipe[] = [];
    useCase.observeRecipes().subscribe((recipes) => {
      actualRecipes = recipes;
    });

    expect(actualRecipes).toEqual(expectedRecipes);
    expect(mockRepository.observeRecipes).toHaveBeenCalled();
  });
});
