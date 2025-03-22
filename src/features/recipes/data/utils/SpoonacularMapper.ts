import { capitalize } from "./../../../../core/utils/stringhelper";
import { injectable } from "inversify";
import {
  RecipeDetail,
  RecipeInstruction,
  RecipeSummary,
} from "../../domain/entities/recipe";
import {
  SpoonacularAnalyzedInstruction,
  SpoonacularRecipeDetail,
  SpoonacularRecipeSummary,
} from "../models";
import { Mapper } from "./Mapper";

@injectable()
export class SpoonacularMapper implements Mapper {
  mapRecipe(recipe: SpoonacularRecipeSummary): RecipeSummary {
    return {
      id: recipe.id.toString(),
      name: recipe.title,
      ingredients: recipe.usedIngredients.map((ingredient) =>
        capitalize(ingredient.name)
      ),
      image: recipe.image,
    };
  }

  mapRecipeDetail(recipeDetail: SpoonacularRecipeDetail): RecipeDetail {
    return {
      id: recipeDetail.id.toString(),
      title: recipeDetail.title,
      subtitle: recipeDetail.summary,
      image: recipeDetail.image,
      ingredients: recipeDetail.extendedIngredients.map((ingredient) =>
        capitalize(ingredient.name)
      ),
      instructions: this.mapRecipeInstructions(
        recipeDetail.analyzedInstructions
      ),
    };
  }

  private mapRecipeInstructions(
    recipeInstructions: SpoonacularAnalyzedInstruction[]
  ): RecipeInstruction[] {
    return recipeInstructions.map((instruction) => ({
      name: instruction.name,
      steps: instruction.steps.map((step) => step.step),
    }));
  }
}
