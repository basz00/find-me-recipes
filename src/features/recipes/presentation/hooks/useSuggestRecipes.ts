import { useEffect, useState } from "react";
import { container } from "@/core/di/container";
import { TYPES } from "@/core/di/types";
import { SuggestRecipesUseCase } from "@/features/recipes/domain/usecases/suggest-recipes.usecase";
import { Recipe } from "@/features/recipes/domain/entities/recipe";

export const useSuggestRecipes = (ingredients: { name: string }[]) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const suggestRecipesUseCase = container.get<SuggestRecipesUseCase>(
    TYPES.SuggestRecipesUseCase
  );

  useEffect(() => {
    setLoading(true);
    const ingredientNames = ingredients.map((ingredient) => ingredient.name);
    suggestRecipesUseCase.execute(ingredientNames);

    const subscription = suggestRecipesUseCase
      .observeRecipes()
      .subscribe((recipes) => {
        if (recipes.length > 0) {
          setLoading(false);
        }
        setRecipes(recipes);
      });

    return () => subscription.unsubscribe();
  }, [ingredients]);

  return {
    recipes,
    loading,
  };
};
