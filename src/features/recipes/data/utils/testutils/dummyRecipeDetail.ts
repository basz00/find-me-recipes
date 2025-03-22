import {
  SpoonacularAnalyzedInstruction,
  SpoonacularIngredient,
  SpoonacularRecipeDetail,
} from "../../models/recipes";

const cuisineOptions = ["Italian", "Indian", "Asian", "American"];
const dishTypeOptions = ["Main Course", "Side Dish", "Dessert", "Appetizer"];

export const getRandomRecipeDetail = (
  id: number,
  title: string,
  subtitle: string,
  image: string,
  ingredients: Array<SpoonacularIngredient>,
  instructions: Array<SpoonacularAnalyzedInstruction>
): SpoonacularRecipeDetail => {
  const randomIndex = Math.floor(4);
  const randomId = id ?? Math.floor(Math.random() * 10000);

  return {
    id: randomId,
    title: title,
    summary: subtitle,
    image: image,
    servings: Math.floor(Math.random() * 8) + 1,
    readyInMinutes: Math.floor(Math.random() * 120) + 15,
    license: "CC BY-SA 3.0",
    sourceName: "Test Source",
    sourceUrl: "https://example.com",
    spoonacularSourceUrl: `https://spoonacular.com/recipes/${randomId}`,
    healthScore: Math.floor(Math.random() * 100),
    pricePerServing: Math.random() * 10,
    cheap: Math.random() < 0.5,
    creditsText: "Test Credits",
    cuisines: [cuisineOptions[randomIndex]],
    dairyFree: Math.random() < 0.5,
    diets: ["Vegetarian"],
    gaps: "no",
    glutenFree: Math.random() < 0.5,
    instructions: "Step 1. Do something.\nStep 2. Do something else.",
    ketogenic: Math.random() < 0.5,
    lowFodmap: Math.random() < 0.5,
    occasions: ["Dinner"],
    sustainable: Math.random() < 0.5,
    vegan: Math.random() < 0.5,
    vegetarian: Math.random() < 0.5,
    veryHealthy: Math.random() < 0.5,
    veryPopular: Math.random() < 0.5,
    weightWatcherSmartPoints: Math.floor(Math.random() * 20),
    dishTypes: [dishTypeOptions[randomIndex]],
    aggregateLikes: Math.floor(Math.random() * 1000),
    spoonacularScore: Math.floor(Math.random() * 100),
    whole30: Math.random() < 0.5,
    extendedIngredients: ingredients,
    analyzedInstructions: instructions,
  };
};
