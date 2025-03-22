import { Observable } from "rxjs";
import { RecipeDetail } from "../entities/recipe";

export interface RecipesDetailsRepository {
  execute(id: number): void;
  observeRecipeDetails(): Observable<RecipeDetail | null>;
}
