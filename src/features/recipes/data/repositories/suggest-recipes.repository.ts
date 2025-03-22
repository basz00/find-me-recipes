import { AxiosInstance } from "axios";
import { injectable } from "inversify";
import { BehaviorSubject, Observable } from "rxjs";
import { container } from "../../../../core/di/container";
import { TYPES } from "../../../../core/di/types";
import { SuggestRecipesRepository } from "../../domain/repositories/suggest-recipes.repository";
import { SpoonacularRecipeSummary } from "../models/recipes";

@injectable()
export class SuggestRecipesRepositoryImpl implements SuggestRecipesRepository {
  private recipes$ = new BehaviorSubject<SpoonacularRecipeSummary[]>([]);
  private readonly api: AxiosInstance;

  constructor() {
    this.api = container.get<AxiosInstance>(TYPES.SpoonacularApi);
  }

  async suggestRecipes(ingredients: string[]) {
    const response = await this.api.get("/recipes/findByIngredients", {
      params: {
        ingredients: ingredients.join(","),
        number: 20,
        ignorePantry: true,
      },
    });

    this.recipes$.next(response.data);
  }

  observeRecipes(): Observable<SpoonacularRecipeSummary[]> {
    return this.recipes$.asObservable();
  }
}
