import { useState, useEffect } from "react";
import { Ingredient } from "../../domain/entities/ingredient";
import { IngredientsRepositoryImpl } from "../../domain/repositories/ingredients.repository";
import { ManageIngredientsUseCaseImpl } from "../../domain/usecases/manage-ingredients.usecase";

const useCase = new ManageIngredientsUseCaseImpl(
  new IngredientsRepositoryImpl()
);

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const subscription = useCase
      .observeIngredients()
      .subscribe((newIngredients) => setIngredients(newIngredients));

    return () => subscription.unsubscribe();
  }, []);

  return {
    ingredients,
    addIngredients: (input: string) => useCase.addIngredients(input),
    removeIngredient: (id: string) => useCase.removeIngredient(id),
  };
};
