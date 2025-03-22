import { capitalize } from "./../../../../../core/utils/stringhelper";
import { SpoonacularRecipeSummary } from "@/features/recipes/data/models";
import { RecipeSummary } from "../../../domain/entities/recipe";
import { SpoonacularMapper } from "../SpoonacularMapper";
import { getRandomAnalyzedInstructions } from "../testutils/dummyAnalyzedInstructions";
import { getRandomIngredient } from "../testutils/dummyIngredients";
import { getRandomRecipeDetail } from "../testutils/dummyRecipeDetail";

const mapper: SpoonacularMapper = new SpoonacularMapper();

it("should correctly map from spoonacular summary model to domain recipe model", () => {
  const id = 2342;
  const name = "Test Recipe";
  const image = "test-image.jpg";
  const ingredient1 = getRandomIngredient();
  const ingredient2 = getRandomIngredient();

  const input: SpoonacularRecipeSummary = {
    id: id,
    image: image,
    imageType: "jpg",
    likes: 10,
    missedIngredientCount: 2,
    missedIngredients: [getRandomIngredient(), getRandomIngredient()],
    title: name,
    unusedIngredients: [],
    usedIngredientCount: 2,
    usedIngredients: [ingredient1, ingredient2],
  };

  const expected: RecipeSummary = {
    id: id.toString(),
    name: name,
    ingredients: [capitalize(ingredient1.name), capitalize(ingredient2.name)],
    image: image,
  };

  const result = mapper.mapRecipe(input);
  expect(result).toEqual(expected);
});

it("should correctly map spoonacular detail to domain detail", () => {
  const id = 928374;
  const title = "Test Recipe Detail";
  const subtitle = "This is a test recipe";
  const image = "test-image.jpg";
  const ingredients = [getRandomIngredient(), getRandomIngredient()];
  const instructions = [getRandomAnalyzedInstructions()];

  const input = getRandomRecipeDetail(
    id,
    title,
    subtitle,
    image,
    ingredients,
    instructions
  );

  const expected = {
    id: id.toString(),
    title: title,
    subtitle: subtitle,
    image: image,
    ingredients: [
      capitalize(ingredients[0].name),
      capitalize(ingredients[1].name),
    ],
    instructions: [
      {
        name: instructions[0].name,
        steps: instructions[0].steps.map((step) => step.step),
      },
    ],
  };

  const result = mapper.mapRecipeDetail(input);
  expect(result).toEqual(expected);
});

it("should handle multiple instructions for domain detail", () => {
  const id = 928374;
  const title = "Test Recipe Detail";
  const subtitle = "This is a test recipe";
  const image = "test-image.jpg";
  const ingredients = [getRandomIngredient(), getRandomIngredient()];
  const instructions = [
    getRandomAnalyzedInstructions(),
    getRandomAnalyzedInstructions(),
  ];

  const input = getRandomRecipeDetail(
    id,
    title,
    subtitle,
    image,
    ingredients,
    instructions
  );

  const expected = {
    id: id.toString(),
    title: title,
    subtitle: subtitle,
    image: image,
    ingredients: [
      capitalize(ingredients[0].name),
      capitalize(ingredients[1].name),
    ],
    instructions: [
      {
        name: instructions[0].name,
        steps: instructions[0].steps.map((step) => step.step),
      },
      {
        name: instructions[1].name,
        steps: instructions[1].steps.map((step) => step.step),
      },
    ],
  };

  const result = mapper.mapRecipeDetail(input);
  expect(result).toEqual(expected);
});
