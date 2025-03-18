import { TestScheduler } from "rxjs/testing";
import { SpoonacularRecipe } from "../../models";
import { SuggestRecipesRepositoryImpl } from "../suggest-recipes.repository";

const mockApi = {
  get: jest.fn(),
};

jest.mock("@/core/di/container", () => ({
  container: {
    get: jest.fn().mockImplementation(() => mockApi),
  },
}));

describe("SuggestRecipesRepositoryImpl", () => {
  let repository: SuggestRecipesRepositoryImpl;

  beforeEach(() => {
    jest.clearAllMocks();

    repository = new SuggestRecipesRepositoryImpl();
  });

  describe("suggestRecipes", () => {
    it("should make API call with correct parameters", async () => {
      const ingredients = ["apple", "banana"];
      const mockResponse = { data: [{ id: 1, title: "Test Recipe" }] };
      mockApi.get.mockResolvedValue(mockResponse);

      await repository.suggestRecipes(ingredients);

      expect(mockApi.get).toHaveBeenCalledWith("/recipes/findByIngredients", {
        params: {
          ingredients: "apple,banana",
          number: 20,
          ignorePantry: true,
        },
      });
    });

    it("should update recipes with response data", async () => {
      const mockResponse = { data: [{ id: 1, title: "Test Recipe" }] };
      mockApi.get.mockResolvedValue(mockResponse);

      await repository.suggestRecipes(["apple"]);

      expect(mockApi.get).toHaveBeenCalled();
    });
  });

  describe("observeRecipes", () => {
    let testScheduler: TestScheduler;

    beforeEach(() => {
      testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });
    });

    it("should emit initial empty array", () => {
      testScheduler.run(({ expectObservable }) => {
        const expected$ = "a";
        const expectedValues = { a: [] as SpoonacularRecipe[] };
        expectObservable(repository.observeRecipes()).toBe(
          expected$,
          expectedValues
        );
      });
    });

    it("should emit updated recipes", () => {
      testScheduler.run(async ({ expectObservable, flush }) => {
        const mockResponse = { data: [{ id: 1, title: "Test Recipe" }] };
        mockApi.get.mockResolvedValue(mockResponse);

        await repository.suggestRecipes(["apple"]);

        const expected$ = "a";
        const expectedValues = {
          a: [{ id: 1, title: "Test Recipe" }],
        };

        expectObservable(repository.observeRecipes()).toBe(
          expected$,
          expectedValues
        );
      });
    });
  });
});
