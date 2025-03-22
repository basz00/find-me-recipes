import { TestScheduler } from "rxjs/testing";
import { of } from "rxjs";
import { SuggestRecipesUseCaseImpl } from "../suggest-recipes.usecase";
import { RecipeSummary } from "../../entities/recipe";
import { SpoonacularMapper } from "@/features/recipes/data/utils";

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
    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    testScheduler.run(({ expectObservable }) => {
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

      const mapper = new SpoonacularMapper();
      const expectedRecipes = mockRecipes.map(mapper.mapRecipe);
      mockRepository.observeRecipes.mockReturnValue(of(mockRecipes));

      const source$ = useCase.observeRecipes();

      expectObservable(source$).toBe("(a|)", {
        a: expectedRecipes,
      });
    });
  });
});
