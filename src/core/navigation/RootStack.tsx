import {
  AddIngredientsScreen,
  SuggestRecipesScreen,
} from "@/features/ingredients/presentation/screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const DefaultRootStack = () => (
  <>
    <Stack.Screen name="AddIngredients" component={AddIngredientsScreen} />
    <Stack.Screen name="SuggestRecipes" component={SuggestRecipesScreen} />
  </>
);

const RootStack = ({ children }: { children: React.ReactNode }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {children}
  </Stack.Navigator>
);

export { RootStack, Stack };
export default RootStack;
