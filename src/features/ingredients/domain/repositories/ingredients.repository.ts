import { BehaviorSubject, Observable } from "rxjs";
import { Ingredient } from "../entities/ingredient";

export interface IngredientsRepository {
  getIngredients(): Ingredient[];
  addIngredients(ingredientNames: string[]): Ingredient[];
  removeIngredient(id: string): void;
  observeIngredients(): Observable<Ingredient[]>;
}

export class IngredientsRepositoryImpl implements IngredientsRepository {
  private ingredients$ = new BehaviorSubject<Ingredient[]>([]);

  getIngredients(): Ingredient[] {
    return this.ingredients$.getValue();
  }

  observeIngredients(): Observable<Ingredient[]> {
    return this.ingredients$.asObservable();
  }

  addIngredients(ingredientNames: string[]): Ingredient[] {
    const newIngredients = ingredientNames
      .map((name) => name.trim())
      .filter(Boolean)
      .map((name) => ({
        id: Math.random().toString(),
        name,
      }))
      .reverse();

    const currentIngredients = this.ingredients$.getValue();
    this.ingredients$.next([...newIngredients, ...currentIngredients]);
    return newIngredients;
  }

  removeIngredient(id: string): void {
    const currentIngredients = this.ingredients$.getValue();
    this.ingredients$.next(currentIngredients.filter((item) => item.id !== id));
  }
}
