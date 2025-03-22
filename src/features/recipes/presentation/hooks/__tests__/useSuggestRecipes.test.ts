import { container } from "@/core/di/container";
import { RecipeSummary } from "@/features/recipes/domain/entities/recipe";
import { renderHook } from "@testing-library/react";
import { useSuggestRecipes } from "../useSuggestRecipes";

jest.mock("@/core/di/container", () => ({
  container: {
    get: jest.fn(),
  },
}));

describe("useSuggestRecipes", () => {
  const mockRecipes: RecipeSummary[] = [
    { id: "1", name: "Recipe 1", ingredients: [], image: "" },
    { id: "2", name: "Recipe 2", ingredients: [], image: "" },
  ];

  let mockExecute: jest.Mock;
  let mockObserveRecipes: jest.Mock;

  beforeEach(() => {
    mockExecute = jest.fn();
    mockObserveRecipes = jest.fn().mockReturnValue({
      subscribe: jest.fn((callback) => {
        callback(mockRecipes);
        return { unsubscribe: jest.fn() };
      }),
    });

    (container.get as jest.Mock).mockReturnValue({
      execute: mockExecute,
      observeRecipes: mockObserveRecipes,
    });
  });

  it("should call suggestRecipesUseCase with correct ingredient names", () => {
    const { result } = renderHook(() => useSuggestRecipes());

    const ingredients = [{ name: "ingredient1" }, { name: "ingredient2" }];
    result.current.execute(ingredients);

    expect(mockExecute).toHaveBeenCalledWith(["ingredient1", "ingredient2"]);
  });

  it("should set loading to false when recipes are received", () => {
    const { result } = renderHook(() => useSuggestRecipes());

    result.current.execute([{ name: "ingredient1" }]);

    expect(result.current.loading).toBe(false);
  });

  it("should set recipes from observeRecipes", () => {
    const { result } = renderHook(() => useSuggestRecipes());

    result.current.execute([{ name: "ingredient1" }]);

    expect(result.current.recipes).toEqual(mockRecipes);
  });
});
