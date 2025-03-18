import { Recipe } from "../entities/recipe";
import { SpoonacularRecipe } from "../../data/models/recipes";

export const mapSpoonacularRecipeToRecipe = (
  recipe: SpoonacularRecipe
): Recipe => {
  return {
    id: recipe.id.toString(),
    name: recipe.title,
    ingredients: recipe.usedIngredients.map((ingredient) => ingredient.name),
    image: recipe.image,
  };
};
