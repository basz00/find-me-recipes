import { container } from "@/core/di/container";
import { injectable } from "inversify";
import { filter, map, Observable, skip } from "rxjs";
import { TYPES } from "../../../../core/di/types";
import { Mapper } from "../../data/utils";
import { RecipeSummary } from "../entities/recipe";
import { SuggestRecipesRepository } from "../repositories/suggest-recipes.repository";

export interface SuggestRecipesUseCase {
  execute(ingredients: string[]): void;
  observeRecipes(): Observable<RecipeSummary[]>;
}

@injectable()
export class SuggestRecipesUseCaseImpl implements SuggestRecipesUseCase {
  constructor(
    private repository: SuggestRecipesRepository = container.get(
      TYPES.SuggestRecipesRepository
    ),
    private mapper: Mapper = container.get(TYPES.SpoonacularMapper)
  ) {}

  execute(ingredients: string[]) {
    this.repository.suggestRecipes(ingredients);
  }

  observeRecipes(): Observable<RecipeSummary[]> {
    return this.repository.observeRecipes().pipe(
      filter((recipes) => recipes.length > 0),
      map((recipes) => recipes.map(this.mapper.mapRecipe))
    );
  }
}
