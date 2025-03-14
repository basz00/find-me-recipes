import { useEffect, useState } from "react";
import { Ingredient } from "../../domain/entities/ingredient";
import { ManageIngredientsUseCase } from "../../domain/usecases/manage-ingredients.usecase";
import { container } from "../../../../core/di/container";
import { TYPES } from "../../../../core/di/types";

const injectedUseCase = container.get<ManageIngredientsUseCase>(
  TYPES.ManageIngredientsUseCase
);

export const useIngredients = (
  useCase: ManageIngredientsUseCase = injectedUseCase
) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const subscription = useCase
      .observeIngredients()
      .subscribe((newIngredients) => {
        setIngredients(newIngredients);
      });
    return () => subscription.unsubscribe();
  }, [useCase]);

  return {
    ingredients,
    addIngredients: (input: string) => useCase.addIngredients(input),
    removeIngredient: (id: string) => useCase.removeIngredient(id),
  };
};
