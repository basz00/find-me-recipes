import { useEffect, useState } from "react";
import { container } from "@/core/di/container";
import { TYPES } from "@/core/di/types";
import { RecipesDetailsUseCase } from "@/features/recipes/domain/usecases/recipes-details.usecase";
import { RecipeDetail } from "@/features/recipes/domain/entities/recipe";

export const useRecipeDetails = (id: number) => {
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const useCase = container.get<RecipesDetailsUseCase>(
    TYPES.RecipesDetailsUseCase
  );

  useEffect(() => {
    const subscription = useCase.observeRecipeDetails().subscribe({
      next: (detail) => {
        setRecipe(detail);
        setLoading(false);
      },
      error: (err) => {
        setError(err);
        setLoading(false);
      },
    });

    useCase.execute(id);

    return () => subscription.unsubscribe();
  }, []);

  return { recipe, loading, error };
};
