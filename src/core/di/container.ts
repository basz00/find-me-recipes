import { Container } from "inversify";
import { TYPES } from "./types";
import { SpoonacularApi } from "../api";
import {
  ManageIngredientsUseCase,
  ManageIngredientsUseCaseImpl,
} from "../../features/ingredients/domain/usecases/manage-ingredients.usecase";
import { IngredientsRepository } from "../../features/ingredients/domain/repositories/ingredients.repository";
import { IngredientsRepositoryImpl } from "@/features/ingredients/data/repositories/ingredients.repository";
import { TranslationService } from "../common/translation/TranslationService";
import { I18nextTranslationService } from "../common/translation/I18nextTranslationService";
import { SuggestRecipesRepository } from "@/features/recipes/domain/repositories/suggest-recipes.repository";
import { SuggestRecipesRepositoryImpl } from "@/features/recipes/data/repositories/suggest-recipes.repository";
import {
  SuggestRecipesUseCaseImpl,
  SuggestRecipesUseCase,
} from "@/features/recipes/domain/usecases/suggest-recipes.usecase";
import { AxiosInstance } from "axios";
import {
  KeyValueStorage,
  SecureKeyValueStorage,
} from "../security/secureStorage";
import { ConfigService } from "../config/configService";
const container = new Container();

container
  .bind<IngredientsRepository>(TYPES.IngredientsRepository)
  .to(IngredientsRepositoryImpl);
container
  .bind<ManageIngredientsUseCase>(TYPES.ManageIngredientsUseCase)
  .to(ManageIngredientsUseCaseImpl);
container
  .bind<TranslationService>(TYPES.TranslationService)
  .to(I18nextTranslationService)
  .inSingletonScope();
container
  .bind<SuggestRecipesRepository>(TYPES.SuggestRecipesRepository)
  .to(SuggestRecipesRepositoryImpl);
container
  .bind<SuggestRecipesUseCase>(TYPES.SuggestRecipesUseCase)
  .to(SuggestRecipesUseCaseImpl);
container
  .bind<AxiosInstance>(TYPES.SpoonacularApi)
  .toDynamicValue(() => new SpoonacularApi().instance)
  .inSingletonScope();
container
  .bind<KeyValueStorage>(TYPES.KeyValueStorage)
  .to(SecureKeyValueStorage)
  .inSingletonScope();
container
  .bind<ConfigService>(TYPES.ConfigService)
  .to(ConfigService)
  .inSingletonScope();

export { container };
