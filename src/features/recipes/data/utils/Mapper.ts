import { RecipeDetail, RecipeSummary } from "../../domain/entities/recipe";
import { SpoonacularRecipeDetail, SpoonacularRecipeSummary } from "../models";

export interface Mapper {
  mapRecipe(recipe: SpoonacularRecipeSummary): RecipeSummary;
  mapRecipeDetail(recipeDetail: SpoonacularRecipeDetail): RecipeDetail;
}
