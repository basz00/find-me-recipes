import { BehaviorSubject, Observable } from "rxjs";
import { injectable } from "inversify";
import { IngredientsRepository } from "../../domain/repositories/ingredients.repository";
import { Ingredient } from "../../domain/entities/ingredient";

@injectable()
export class IngredientsRepositoryImpl implements IngredientsRepository {
  private ingredients$ = new BehaviorSubject<Ingredient[]>([]);

  getIngredients(): Ingredient[] {
    return this.ingredients$.getValue();
  }

  observeIngredients(): Observable<Ingredient[]> {
    return this.ingredients$.asObservable();
  }

  addIngredients(ingredientNames: string[]): Ingredient[] {
    const currentIngredients = this.ingredients$.getValue();
    const currentIngredientNames = currentIngredients.map(i => i.name.toLowerCase());
    
    const newIngredients = ingredientNames
      .map((name) => name.trim())
      .filter(Boolean)
      .filter(name => !currentIngredientNames.includes(name.toLowerCase()))
      .map((name) => ({
        id: Math.random().toString(),
        name,
      }))
      .reverse();

    if (newIngredients.length > 0) {
      this.ingredients$.next([...newIngredients, ...currentIngredients]);
    }
    
    return newIngredients;
  }

  removeIngredient(id: string): void {
    const currentIngredients = this.ingredients$.getValue();
    this.ingredients$.next(currentIngredients.filter((item) => item.id !== id));
  }
}
