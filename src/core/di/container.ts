import { Container } from "inversify";
import { TYPES } from "./types";
import {
  IngredientsRepository,
  IngredientsRepositoryImpl,
} from "../../features/ingredients/domain/repositories/ingredients.repository";
import {
  ManageIngredientsUseCase,
  ManageIngredientsUseCaseImpl,
} from "../../features/ingredients/domain/usecases/manage-ingredients.usecase";

const container = new Container();

container
  .bind<IngredientsRepository>(TYPES.IngredientsRepository)
  .to(IngredientsRepositoryImpl);
container
  .bind<ManageIngredientsUseCase>(TYPES.ManageIngredientsUseCase)
  .to(ManageIngredientsUseCaseImpl);

export { container };
