export interface RecipeSummary {
  id: string;
  name: string;
  ingredients: string[];
  image: string;
}

export interface RecipeDetail {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  ingredients: string[];
  instructions: RecipeInstruction[];
}

export interface RecipeInstruction {
  name: string;
  steps: string[];
}
