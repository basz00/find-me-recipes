import React from "react";
import { View, Text } from "react-native";
import { ThemeProvider } from "./core/ui/theme/ThemeContext";
import { AddIngredientsScreen } from "./features/ingredients/presentation/screens/AddIngredientsScreen";

export default function App() {
  return (
    <ThemeProvider>
      <AddIngredientsScreen />
    </ThemeProvider>
  );
}
