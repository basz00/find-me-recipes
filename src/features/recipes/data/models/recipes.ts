export interface SpoonacularIngredient {
  aisle: string;
  amount: number;
  id: number;
  image: string;
  meta: string[];
  name: string;
  original: string;
  originalName: string;
  unit: string;
  unitLong: string;
  unitShort: string;
}

export interface SpoonacularRecipe {
  id: number;
  image: string;
  imageType: string;
  likes: number;
  missedIngredientCount: number;
  missedIngredients: SpoonacularIngredient[];
  title: string;
  unusedIngredients: SpoonacularIngredient[];
  usedIngredientCount: number;
  usedIngredients: SpoonacularIngredient[];
}
