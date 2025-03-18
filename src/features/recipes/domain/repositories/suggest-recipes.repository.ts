import { Observable } from "rxjs";
import { SpoonacularRecipe } from "../../data/models";

export interface SuggestRecipesRepository {
  suggestRecipes(ingredients: string[]): void;
  observeRecipes(): Observable<SpoonacularRecipe[]>;
}
