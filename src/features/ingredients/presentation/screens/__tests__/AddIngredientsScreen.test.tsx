import {
  userEvent,
  render,
  screen,
  waitFor,
  mockSetImmediate,
  deleteMockSetImmediate,
  within,
} from "@/test-utils/test-utils";
import React from "react";
import AddIngredientsScreen from "../AddIngredientsScreen";

const mockAddIngredients = jest.fn();
const mockRemoveIngredient = jest.fn();
let mockIngredients = [
  { id: "1", name: "Ingredient 1" },
  { id: "2", name: "Ingredient 2" },
];

jest.mock("../../hooks/useIngredients", () => ({
  useIngredients: () => ({
    ingredients: mockIngredients,
    addIngredients: mockAddIngredients,
    removeIngredient: mockRemoveIngredient,
  }),
}));

jest.mock(
  "@/features/ingredients/presentation/translation/TranslationMapper",
  () => ({
    addIngredientsTranslation: {
      inputPlaceholder: "addIngredients.inputPlaceholder",
      button: {
        add: "addIngredients.addButton",
        find: "addIngredients.findRecipesButtonCount",
      },
      title: "addIngredients.title",
      subtitle: "addIngredients.subtitle",
    },
  })
);

describe("AddIngredientsScreen", () => {
  beforeEach(() => {
    mockSetImmediate();
  });

  afterEach(() => {
    deleteMockSetImmediate();
  });

  it("should show list when ingredients exist", () => {
    render(<AddIngredientsScreen />);

    expect(screen.getByText(mockIngredients[0].name)).toBeVisible();
    expect(screen.getByText(mockIngredients[1].name)).toBeVisible();
  });

  it("should call add ingredient when add button is pressed", async () => {
    render(<AddIngredientsScreen />);

    const user = userEvent.setup();

    const input = await screen.findByPlaceholderText("Enter ingredient...");
    await user.type(input, "New Ingredient");

    const addButton = await screen.findByText("Add");
    await user.press(addButton);

    expect(mockAddIngredients).toHaveBeenCalledWith("New Ingredient");
  });

  it("should call remove ingredient when add button is pressed", async () => {
    render(<AddIngredientsScreen />);

    const user = userEvent.setup();

    const ingredientItemContainer = await screen.findByTestId(
      `ingredient-item-${mockIngredients[1].id}`
    );
    expect(
      within(ingredientItemContainer).getByText(mockIngredients[1].name)
    ).toBeVisible();

    const removeButton = within(ingredientItemContainer).getByText("x");

    expect(removeButton).toBeVisible();

    await user.press(removeButton);

    expect(mockRemoveIngredient).toHaveBeenCalledWith(mockIngredients[1].id);
  });

  it("should enable find button when ingredients exist", () => {
    render(<AddIngredientsScreen />);
    const findButton = screen.getByText("Find Recipes (2)");
    expect(findButton).toBeEnabled();
  });

  it("should disable find button when ingredients do not exist", () => {
    mockIngredients = [];
    render(<AddIngredientsScreen />);
    const findButton = screen.getByText("Find Recipes (0)");
    expect(findButton).toBeDisabled();
  });
});
