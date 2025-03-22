import { Observable } from "rxjs";
import { SpoonacularRecipeSummary } from "../../data/models";

export interface SuggestRecipesRepository {
  suggestRecipes(ingredients: string[]): void;
  observeRecipes(): Observable<SpoonacularRecipeSummary[]>;
}
