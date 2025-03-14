import { Observable } from "rxjs";
import { Ingredient } from "../entities/ingredient";

export interface IngredientsRepository {
  getIngredients(): Ingredient[];
  addIngredients(ingredientNames: string[]): Ingredient[];
  removeIngredient(id: string): void;
  observeIngredients(): Observable<Ingredient[]>;
}
