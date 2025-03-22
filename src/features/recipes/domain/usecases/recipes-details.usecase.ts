import { container } from "@/core/di/container";
import { TYPES } from "@/core/di/types";
import { RecipeDetail } from "@/features/recipes/domain/entities/recipe";
import { RecipesDetailsRepository } from "@/features/recipes/domain/repositories/recipes-details.repository";
import { injectable } from "inversify";
import { Observable } from "rxjs";

export interface RecipesDetailsUseCase {
  execute(id: number): void;
  observeRecipeDetails(): Observable<RecipeDetail | null>;
}

@injectable()
export class RecipesDetailsUseCaseImpl implements RecipesDetailsUseCase {
  constructor(
    private repository: RecipesDetailsRepository = container.get(
      TYPES.RecipesDetailsRepository
    )
  ) {}

  execute(id: number): void {
    this.repository.execute(id);
  }
  observeRecipeDetails(): Observable<RecipeDetail | null> {
    return this.repository.observeRecipeDetails();
  }
}
