import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "../../../../core/ui/theme/ThemeContext";
import { colors as themeColors } from "../../../../core/ui/theme/colors";
import { typography as themeTypography } from "../../../../core/ui/theme/typography";
import { spacing as themeSpacing } from "../../../../core/ui/theme/spacing";
import { Ingredient } from "../../domain/entities/ingredient";
import { useIngredients } from "../hooks/useIngredients";

export const AddIngredientsScreen = () => {
  const { colors, typography, spacing } = useTheme();
  const [inputText, setInputText] = useState("");
  const { ingredients, addIngredients, removeIngredient } = useIngredients();
  const styles = makeStyles(colors, typography, spacing);

  const handleAddIngredient = useCallback(() => {
    if (inputText.trim()) {
      addIngredients(inputText);
      setInputText("");
    }
  }, [inputText, addIngredients]);

  const handleRemoveIngredient = useCallback(
    (id: string) => {
      removeIngredient(id);
    },
    [removeIngredient]
  );

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
    <View style={styles.container}>
      <View>
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
      </View>

      <FlatList
        data={ingredients}
        renderItem={renderIngredientItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
      />

      <View>
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
    </View>
  );
};

const makeStyles = (
  colors: typeof themeColors,
  typography: typeof themeTypography,
  spacing: typeof themeSpacing
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
      padding: spacing.md,
    },
    list: {
      flex: 1,
      marginVertical: spacing.md,
    },
    listContent: {
      gap: spacing.sm,
    },
    title: {
      fontSize: typography.size["2xl"],
      fontWeight: typography.weight.bold,
      marginBottom: spacing.xs,
      color: colors.text.primary,
    },
    subtitle: {
      fontSize: typography.size.sm,
      color: colors.text.secondary,
      marginBottom: spacing.xl,
    },
    inputContainer: {
      flexDirection: "row",
      marginBottom: spacing.md,
      gap: spacing.xs,
    },
    input: {
      flex: 1,
      height: spacing["4xl"],
      borderWidth: 1,
      borderColor: colors.neutral.grey[200],
      borderRadius: spacing.xs,
      paddingHorizontal: spacing.input.padding,
      fontSize: typography.size.base,
      color: colors.text.primary,
      backgroundColor: colors.background.default,
    },
    addButton: {
      backgroundColor: colors.primary.main,
      height: spacing["4xl"],
      paddingHorizontal: spacing.md,
      borderRadius: spacing.xs,
      justifyContent: "center",
      alignItems: "center",
    },
    addButtonText: {
      color: colors.neutral.white,
      fontSize: typography.size.base,
      fontWeight: typography.weight.semibold,
    },
    ingredientItem: {
      flexDirection: "row",
      backgroundColor: colors.neutral.grey[100],
      padding: spacing.md,
      borderRadius: spacing.xs,
      alignItems: "center",
      justifyContent: "space-between",
    },
    ingredientText: {
      fontSize: typography.size.base,
      color: colors.text.primary,
      flex: 1,
    },
    removeText: {
      fontSize: typography.size.xl,
      color: colors.text.secondary,
      marginLeft: spacing.xs,
    },
    searchButton: {
      backgroundColor: colors.primary.main,
      height: spacing["5xl"],
      borderRadius: spacing.sm,
      justifyContent: "center",
      alignItems: "center",
    },
    searchButtonText: {
      color: colors.neutral.white,
      fontSize: typography.size.lg,
      fontWeight: typography.weight.semibold,
    },
    disabledButton: {
      opacity: 0.5,
    },
  });
