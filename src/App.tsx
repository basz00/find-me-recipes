import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "./core/navigation";
import { ThemeProvider } from "./core/ui/theme/ThemeContext";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultRootStack } from "./core/navigation/RootStack";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
          <NavigationContainer>
            <DefaultRootStack />
          </NavigationContainer>
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
