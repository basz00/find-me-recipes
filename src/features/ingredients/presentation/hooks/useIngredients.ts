import { useEffect, useState } from "react";
import { Ingredient } from "../../domain/entities/ingredient";
import { ManageIngredientsUseCase } from "../../domain/usecases/manage-ingredients.usecase";
import { container } from "../../../../core/di/container";
import { TYPES } from "../../../../core/di/types";

const useCase = container.get<ManageIngredientsUseCase>(
  TYPES.ManageIngredientsUseCase
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
