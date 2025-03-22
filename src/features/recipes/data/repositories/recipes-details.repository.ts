import { TYPES } from "@/core/di/types";
import { container } from "@/core/di/container";
import { RecipeDetail } from "@/features/recipes/domain/entities/recipe";
import { RecipesDetailsRepository } from "@/features/recipes/domain/repositories/recipes-details.repository";
import { injectable } from "inversify";
import { BehaviorSubject, Observable } from "rxjs";
import { GetDetailsApi } from "../datasources/get-details.api";
import { Mapper, SpoonacularMapper } from "../utils";

@injectable()
export class RecipesDetailsRepositoryImpl implements RecipesDetailsRepository {
  private readonly detailsApi: GetDetailsApi;
  private readonly details$ = new BehaviorSubject<RecipeDetail | null>(null);
  private readonly mapper: Mapper;

  constructor() {
    this.detailsApi = container.get(TYPES.GetDetailsApi);
    this.mapper = container.get(TYPES.SpoonacularMapper);
  }

  async execute(id: number) {
    const detail = await this.detailsApi.getDetails(id);
    this.details$.next(this.mapper.mapRecipeDetail(detail));
  }

  observeRecipeDetails(): Observable<RecipeDetail | null> {
    return this.details$.asObservable();
  }
}
