import { Ingredient } from "@/features/ingredients/domain/entities/ingredient";

export type RootStackParamList = {
  AddIngredients: undefined;
  SuggestRecipes: { ingredients: Ingredient[] };
};
