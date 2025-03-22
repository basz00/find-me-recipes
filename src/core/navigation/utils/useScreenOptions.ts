import { useCallback } from "react";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export const useScreenOptions = (options?: NativeStackNavigationOptions) => {
  const screenOptions = useCallback((): NativeStackNavigationOptions => {
    return {
      headerShown: true,
      headerBackTitle: "",
      headerTintColor: "#007AFF",
      headerTitleStyle: {
        fontSize: 16,
        fontWeight: "600",
      },
      ...options,
    };
  }, []);

  return { screenOptions };
};
