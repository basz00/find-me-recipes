import { useEffect, useState } from "react";
import { container } from "@/core/di/container";
import { TYPES } from "@/core/di/types";
import { SuggestRecipesUseCase } from "@/features/recipes/domain/usecases/suggest-recipes.usecase";
import { RecipeSummary } from "@/features/recipes/domain/entities/recipe";

export const useSuggestRecipes = () => {
  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const suggestRecipesUseCase = container.get<SuggestRecipesUseCase>(
    TYPES.SuggestRecipesUseCase
  );

  useEffect(() => {
    const subscription = suggestRecipesUseCase
      .observeRecipes()
      .subscribe((recipes) => {
        if (recipes.length > 0) {
          setLoading(false);
        }
        setRecipes(recipes);
      });

    return () => subscription.unsubscribe();
  }, []);

  const execute = (ingredients: { name: string }[]) => {
    setLoading(true);
    const ingredientNames = ingredients.map((ingredient) => ingredient.name);
    suggestRecipesUseCase.execute(ingredientNames);
  };

  return {
    execute,
    recipes,
    loading,
  };
};
