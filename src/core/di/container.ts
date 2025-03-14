import { Container } from "inversify";
import { TYPES } from "./types";
import { IngredientsRepository } from "../../features/ingredients/domain/repositories/ingredients.repository";
import {
  ManageIngredientsUseCase,
  ManageIngredientsUseCaseImpl,
} from "../../features/ingredients/domain/usecases/manage-ingredients.usecase";
import { IngredientsRepositoryImpl } from "../../features/ingredients/data/repositories/ingredients.repository";
import { TranslationService } from "../common/translation/TranslationService";
import { I18nextTranslationService } from "../common/translation/I18nextTranslationService";

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

export { container };
