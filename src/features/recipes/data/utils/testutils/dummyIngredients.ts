import { SpoonacularIngredient } from "../../models";

const metaOptions = [
  ["fresh", "organic"],
  ["canned", "preserved"],
  ["frozen", "pre-cut"],
  ["dried", "spiced"],
];

const imageOptions = ["tomato.jpg", "beans.jpg", "carrot.jpg", "potato.jpg"];

const nameOptions = ["tomato", "green Beans", "carrot", "potato"];

const originalOptions = [
  "2 fresh tomatoes",
  "1 can of green beans",
  "3 medium carrots",
  "4 large potatoes",
];

const originalNameOptions = ["tomato", "green Beans", "carrot", "potato"];

const amountOptions = [2, 1, 3, 4];

export const getRandomIngredient = (): SpoonacularIngredient => {
  const randomIndex = Math.floor(Math.random() * 4);
  const randomId = Math.floor(Math.random() * 5000);

  return {
    aisle: "Produce",
    amount: amountOptions[randomIndex],
    id: randomId,
    image: imageOptions[randomIndex],
    meta: metaOptions[randomIndex],
    name: nameOptions[randomIndex],
    original: originalOptions[randomIndex],
    originalName: originalNameOptions[randomIndex],
    unit: "",
    unitLong: "",
    unitShort: "",
  };
};
