import React from "react";
import SuggestRecipesScreen from "@/features/recipes/presentation/screens/SuggestRecipesScreen";
import Shimmer from "@/core/ui/components/Shimmer";
import { NavigationContainer } from "@react-navigation/native";
import RootStack, { Stack } from "@/core/navigation/RootStack";
import {
  deleteMockSetImmediate,
  mockSetImmediate,
  render,
  screen,
} from "@/test-utils/test-utils";

jest.mock("@/core/ui/components/Shimmer", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock("@/features/recipes/presentation/hooks/useSuggestRecipes", () => ({
  useSuggestRecipes: jest.fn(),
}));

const mockRecipes = [
  {
    id: 1,
    name: "Test Recipe",
    image: "https://test.com/image.jpg",
    ingredients: ["Ingredient 1", "Ingredient 2"],
  },
];

describe("SuggestRecipesScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSetImmediate();
    global.clearImmediate = jest.fn();
  });

  afterEach(() => {
    deleteMockSetImmediate();
  });

  const renderSuggestRecipesScreen = () => {
    render(
      <NavigationContainer>
        <RootStack>
          <Stack.Screen
            name="SuggestRecipes"
            component={SuggestRecipesScreen}
            initialParams={{
              ingredients: ["Ingredient 1", "Ingredient 2"],
            }}
          />
        </RootStack>
      </NavigationContainer>
    );
  };

  it("should show shimmer when loading is true", () => {
    require("@/features/recipes/presentation/hooks/useSuggestRecipes").useSuggestRecipes.mockReturnValue(
      {
        recipes: [],
        loading: true,
      }
    );

    renderSuggestRecipesScreen();

    expect(Shimmer).toHaveBeenCalled();
  });

  it("should not show shimmer when loading is false", () => {
    require("@/features/recipes/presentation/hooks/useSuggestRecipes").useSuggestRecipes.mockReturnValue(
      {
        recipes: mockRecipes,
        loading: false,
      }
    );

    renderSuggestRecipesScreen();

    expect(Shimmer).not.toHaveBeenCalled();
  });

  it("should show recipe image, name and ingredients when loading is false", () => {
    require("@/features/recipes/presentation/hooks/useSuggestRecipes").useSuggestRecipes.mockReturnValue(
      {
        recipes: mockRecipes,
        loading: false,
      }
    );

    renderSuggestRecipesScreen();

    expect(screen.getByTestId("recipe-item-1")).toBeVisible();
    expect(screen.getByText("Test Recipe")).toBeVisible();
    expect(screen.getByText("Ingredient 1, Ingredient 2")).toBeVisible();
  });
});
