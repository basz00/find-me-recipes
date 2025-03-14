import { container } from "@/src/core/di/container";
import { injectable } from "inversify";
import { Observable } from "rxjs";
import { TYPES } from "../../../../core/di/types";
import { Ingredient } from "../entities/ingredient";
import { IngredientsRepository } from "../repositories/ingredients.repository";

export interface ManageIngredientsUseCase {
  addIngredients(input: string): Ingredient[];
  removeIngredient(id: string): void;
  getIngredients(): Ingredient[];
  observeIngredients(): Observable<Ingredient[]>;
}

@injectable()
export class ManageIngredientsUseCaseImpl implements ManageIngredientsUseCase {
  constructor(
    private repository: IngredientsRepository = container.get(
      TYPES.IngredientsRepository
    )
  ) {}

  observeIngredients(): Observable<Ingredient[]> {
    return this.repository.observeIngredients();
  }

  addIngredients(input: string): Ingredient[] {
    const ingredientNames = input.split(",");
    return this.repository.addIngredients(ingredientNames);
  }

  removeIngredient(id: string): void {
    this.repository.removeIngredient(id);
  }

  getIngredients(): Ingredient[] {
    return this.repository.getIngredients();
  }
}
