import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTheme } from "../../../../core/ui/theme/ThemeContext";

type Ingredient = {
  id: string;
  name: string;
};

export const AddIngredientsScreen = () => {
  const { colors } = useTheme();
  const [inputText, setInputText] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const styles = makeStyles(colors);

  const handleAddIngredient = useCallback(() => {
    if (inputText.trim()) {
      const newIngredients = inputText
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .map((name) => ({
          id: Math.random().toString(),
          name,
        }));

      setIngredients((prev) => [...prev, ...newIngredients]);
      setInputText("");
    }
  }, [inputText]);

  const handleRemoveIngredient = useCallback((id: string) => {
    setIngredients((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleSubmitEditing = () => {
    handleAddIngredient();
  };

  const renderIngredientItem = ({ item }: { item: Ingredient }) => (
    <TouchableOpacity
      style={styles.ingredientItem}
      onPress={() => handleRemoveIngredient(item.id)}
    >
      <Text style={styles.ingredientText}>{item.name}</Text>
      <Text style={styles.removeText}>×</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Add Your Ingredients</Text>
        <Text style={styles.subtitle}>
          Enter ingredients you have (separate with comma or press enter)
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Enter ingredient..."
            placeholderTextColor={colors.text.secondary}
            onSubmitEditing={handleSubmitEditing}
            returnKeyType="done"
          />
          <TouchableOpacity
            style={[
              styles.addButton,
              !inputText.trim() && styles.disabledButton,
            ]}
            onPress={handleAddIngredient}
            disabled={!inputText.trim()}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={ingredients}
          renderItem={renderIngredientItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />

        <TouchableOpacity
          style={[
            styles.searchButton,
            !ingredients.length && styles.disabledButton,
          ]}
          disabled={!ingredients.length}
        >
          <Text style={styles.searchButtonText}>
            Find Recipes ({ingredients.length})
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    content: {
      flex: 1,
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 8,
      color: colors.text.primary,
    },
    subtitle: {
      fontSize: 14,
      color: colors.text.secondary,
      marginBottom: 24,
    },
    inputContainer: {
      flexDirection: "row",
      marginBottom: 16,
    },
    input: {
      flex: 1,
      height: 48,
      borderWidth: 1,
      borderColor: colors.neutral.grey[200],
      borderRadius: 8,
      paddingHorizontal: 16,
      marginRight: 8,
      fontSize: 16,
      color: colors.text.primary,
      backgroundColor: colors.background.default,
    },
    addButton: {
      backgroundColor: colors.primary.main,
      height: 48,
      paddingHorizontal: 16,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    addButtonText: {
      color: colors.neutral.white,
      fontSize: 16,
      fontWeight: "600",
    },
    list: {
      flex: 1,
    },
    listContent: {
      paddingVertical: 8,
    },
    ingredientItem: {
      flexDirection: "row",
      backgroundColor: colors.neutral.grey[100],
      padding: 12,
      borderRadius: 8,
      marginBottom: 8,
      alignItems: "center",
      justifyContent: "space-between",
    },
    ingredientText: {
      fontSize: 16,
      color: colors.text.primary,
      flex: 1,
    },
    removeText: {
      fontSize: 20,
      color: colors.text.secondary,
      marginLeft: 8,
    },
    searchButton: {
      backgroundColor: colors.primary.main,
      height: 56,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 16,
    },
    searchButtonText: {
      color: colors.neutral.white,
      fontSize: 18,
      fontWeight: "600",
    },
    disabledButton: {
      opacity: 0.5,
    },
  });
