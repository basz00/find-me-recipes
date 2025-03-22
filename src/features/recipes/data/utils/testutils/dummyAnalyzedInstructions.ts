import {
  SpoonacularAnalyzedInstruction,
  SpoonacularInstructionStep,
  SpoonacularInstructionIngredient,
  SpoonacularInstructionEquipment,
} from "../../models/recipes";

const dummyIngredients: SpoonacularInstructionIngredient[] = [
  {
    id: 1001,
    name: "butter",
    localizedName: "butter",
    image: "butter.jpg",
  },
  {
    id: 20081,
    name: "flour",
    localizedName: "flour",
    image: "flour.jpg",
  },
  {
    id: 19335,
    name: "sugar",
    localizedName: "sugar",
    image: "sugar.jpg",
  },
  {
    id: 1123,
    name: "egg",
    localizedName: "egg",
    image: "egg.jpg",
  },
];

const dummyEquipment: SpoonacularInstructionEquipment[] = [
  {
    id: 404784,
    name: "oven",
    localizedName: "oven",
    image: "oven.jpg",
  },
  {
    id: 404661,
    name: "bowl",
    localizedName: "bowl",
    image: "bowl.jpg",
  },
  {
    id: 404783,
    name: "whisk",
    localizedName: "whisk",
    image: "whisk.jpg",
  },
];

const dummyStepsCake: SpoonacularInstructionStep[] = [
  {
    number: 1,
    step: "Preheat the oven to 350 degrees F (175 degrees C).",
    ingredients: [dummyIngredients[0]],
    equipment: [dummyEquipment[0]],
  },
  {
    number: 2,
    step: "Mix the flour, sugar, and eggs in a bowl.",
    ingredients: [
      dummyIngredients[1],
      dummyIngredients[2],
      dummyIngredients[3],
    ],
    equipment: [dummyEquipment[1], dummyEquipment[2]],
  },
  {
    number: 3,
    step: "Pour the batter into a greased baking pan.",
    ingredients: [],
    equipment: [dummyEquipment[1]],
  },
];

const dummyStepsPasta: SpoonacularInstructionStep[] = [
  {
    number: 1,
    step: "Boil water in a large pot.",
    ingredients: [],
    equipment: [dummyEquipment[1]],
  },
  {
    number: 2,
    step: "Add salt and pasta to the boiling water.",
    ingredients: [dummyIngredients[1]],
    equipment: [],
  },
  {
    number: 3,
    step: "Cook pasta according to package instructions.",
    ingredients: [],
    equipment: [],
  },
];

const dummyStepsSalad: SpoonacularInstructionStep[] = [
  {
    number: 1,
    step: "Wash and chop all vegetables.",
    ingredients: [],
    equipment: [],
  },
  {
    number: 2,
    step: "Combine all ingredients in a large bowl.",
    ingredients: [dummyIngredients[0], dummyIngredients[1]],
    equipment: [dummyEquipment[1]],
  },
  {
    number: 3,
    step: "Toss the salad with dressing.",
    ingredients: [],
    equipment: [],
  },
];

const nameStepsPairings = [
  {
    name: "Cake Instructions",
    steps: dummyStepsCake,
  },
  {
    name: "Pasta Instructions",
    steps: dummyStepsPasta,
  },
  {
    name: "Salad Instructions",
    steps: dummyStepsSalad,
  },
];

export const getRandomAnalyzedInstructions =
  (): SpoonacularAnalyzedInstruction => {
    const random = Math.floor(Math.random() * 3);

    return nameStepsPairings[random];
  };
