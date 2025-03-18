import { SpoonacularRecipe } from "@/features/recipes/data/models";
import { mapSpoonacularRecipeToRecipe } from "../index";
import { Recipe } from "../../entities/recipe";

describe("mapSpoonacularRecipeToRecipe", () => {
  it("should correctly map all properties", () => {
    const input: SpoonacularRecipe = {
      id: 123,
      image: "test-image.jpg",
      imageType: "jpg",
      likes: 10,
      missedIngredientCount: 2,
      missedIngredients: [
        {
          aisle: "Produce",
          amount: 1,
          id: 3,
          image: "missed1.jpg",
          meta: [],
          name: "Missed Ingredient 1",
          original: "1 Missed Ingredient 1",
          originalName: "Missed Ingredient 1",
          unit: "",
          unitLong: "",
          unitShort: "",
        },
      ],
      title: "Test Recipe",
      unusedIngredients: [],
      usedIngredientCount: 2,
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
        {
          aisle: "Dairy",
          amount: 2,
          id: 2,
          image: "ing2.jpg",
          meta: [],
          name: "Ingredient 2",
          original: "2 Ingredient 2",
          originalName: "Ingredient 2",
          unit: "cups",
          unitLong: "cups",
          unitShort: "c",
        },
      ],
    };

    const expected: Recipe = {
      id: "123",
      name: "Test Recipe",
      ingredients: ["Ingredient 1", "Ingredient 2"],
      image: "test-image.jpg",
    };

    const result = mapSpoonacularRecipeToRecipe(input);
    expect(result).toEqual(expected);
  });

  it("should handle empty ingredients array", () => {
    const input: SpoonacularRecipe = {
      id: 456,
      image: "empty-image.jpg",
      imageType: "jpg",
      likes: 0,
      missedIngredientCount: 0,
      missedIngredients: [],
      title: "Empty Ingredients Recipe",
      unusedIngredients: [],
      usedIngredientCount: 0,
      usedIngredients: [],
    };

    const expected: Recipe = {
      id: "456",
      name: "Empty Ingredients Recipe",
      ingredients: [],
      image: "empty-image.jpg",
    };

    const result = mapSpoonacularRecipeToRecipe(input);
    expect(result).toEqual(expected);
  });
});
