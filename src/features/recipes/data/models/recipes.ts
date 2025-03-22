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

export interface SpoonacularRecipeSummary {
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

export interface SpoonacularRecipeDetail {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  license: string;
  sourceName: string;
  sourceUrl: string;
  spoonacularSourceUrl: string;
  aggregateLikes: number;
  healthScore: number;
  spoonacularScore: number;
  pricePerServing: number;
  analyzedInstructions: SpoonacularAnalyzedInstruction[];
  cheap: boolean;
  creditsText: string;
  cuisines: string[];
  dairyFree: boolean;
  diets: string[];
  gaps: string;
  glutenFree: boolean;
  instructions: string;
  ketogenic: boolean;
  lowFodmap: boolean;
  occasions: string[];
  sustainable: boolean;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  whole30: boolean;
  weightWatcherSmartPoints: number;
  dishTypes: string[];
  extendedIngredients: SpoonacularIngredient[];
  summary: string;
}

export interface SpoonacularAnalyzedInstruction {
  name: string;
  steps: SpoonacularInstructionStep[];
}

export interface SpoonacularInstructionStep {
  number: number;
  step: string;
  ingredients: SpoonacularInstructionIngredient[];
  equipment: SpoonacularInstructionEquipment[];
}

export interface SpoonacularInstructionIngredient {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface SpoonacularInstructionEquipment {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}
