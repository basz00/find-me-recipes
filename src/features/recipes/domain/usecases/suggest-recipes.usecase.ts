import { container } from "@/core/di/container";
import { injectable } from "inversify";
import { map, Observable } from "rxjs";
import { TYPES } from "../../../../core/di/types";
import { Recipe } from "../entities/recipe";
import { SuggestRecipesRepository } from "../repositories/suggest-recipes.repository";
import { mapSpoonacularRecipeToRecipe } from "../utils";

export interface SuggestRecipesUseCase {
  execute(ingredients: string[]): void;
  observeRecipes(): Observable<Recipe[]>;
}

@injectable()
export class SuggestRecipesUseCaseImpl implements SuggestRecipesUseCase {
  constructor(
    private repository: SuggestRecipesRepository = container.get(
      TYPES.SuggestRecipesRepository
    )
  ) {}

  execute(ingredients: string[]) {
    this.repository.suggestRecipes(ingredients);
  }

  observeRecipes(): Observable<Recipe[]> {
    return this.repository
      .observeRecipes()
      .pipe(map((recipes) => recipes.map(mapSpoonacularRecipeToRecipe)));
  }
}
