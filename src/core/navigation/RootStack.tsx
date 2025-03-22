import { AddIngredientsScreen } from "@/features/ingredients/presentation/screens";
import { RecipeDetailsScreen } from "@/features/recipes/presentation/screens";
import SuggestRecipesScreen from "@/features/recipes/presentation/screens/SuggestRecipesScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const DefaultRootStack = () => (
  <RootStack>
    <Stack.Screen name="AddIngredients" component={AddIngredientsScreen} />
    <Stack.Screen name="SuggestRecipes" component={SuggestRecipesScreen} />
    <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
  </RootStack>
);

const RootStack = ({ children }: { children: React.ReactNode }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {children}
  </Stack.Navigator>
);

export { RootStack, DefaultRootStack, Stack };
export default RootStack;
