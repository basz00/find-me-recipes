import { TranslationService } from "@/core/common/translation/TranslationService";
import { container } from "@/core/di/container";
import { TYPES } from "@/core/di/types";
import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/core/navigation";
import {
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  FlatList,
} from "react-native";
import { useTheme } from "@/core/ui/theme/ThemeContext";
import { colors as themeColors } from "@/core/ui/theme/colors";
import { spacing as themeSpacing } from "@/core/ui/theme/spacing";
import { typography as themeTypography } from "@/core/ui/theme/typography";
import { Ingredient } from "../../domain/entities/ingredient";
import { useIngredients } from "../hooks/useIngredients";
import { addIngredientsTranslation } from "../translation/TranslationMapper";

const AddIngredientsScreen = () => {
  const translationService = container.get<TranslationService>(
    TYPES.TranslationService
  );

  const { colors, typography, spacing } = useTheme();
  const t = translationService.t;
  const [inputText, setInputText] = useState("");
  const { ingredients, addIngredients, removeIngredient } = useIngredients();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const styles = makeStyles(colors, typography, spacing);

  const handleAddIngredient = useCallback(() => {
    if (inputText.trim().length > 0) {
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

  const renderTextInput = () => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder={t(addIngredientsTranslation.inputPlaceholder)}
        placeholderTextColor={colors.text.secondary}
        onSubmitEditing={handleSubmitEditing}
        returnKeyType="done"
        testID="ingredient-input"
      />
      <Pressable
        style={[styles.addButton, !inputText.trim() && styles.disabledButton]}
        onPress={handleAddIngredient}
        disabled={!inputText.trim()}
        testID="add-ingredient-button"
      >
        <Text style={styles.addButtonText}>
          {t(addIngredientsTranslation.button.add)}
        </Text>
      </Pressable>
    </View>
  );

  const renderIngredientItem = ({ item }: { item: Ingredient }) => (
    <Pressable
      style={styles.ingredientItem}
      testID={`ingredient-item-${item.id}`}
    >
      <Text style={styles.ingredientText}>{item.name}</Text>
      <Pressable
        style={styles.removeButton}
        onPress={() => handleRemoveIngredient(item.id)}
      >
        <Text style={styles.removeText}>x</Text>
      </Pressable>
    </Pressable>
  );

  const renderFindButton = () => (
    <View>
      <Pressable
        style={[
          styles.searchButton,
          !ingredients.length && styles.disabledButton,
        ]}
        disabled={!ingredients.length}
        onPress={() => navigation.navigate("SuggestRecipes", { ingredients })}
      >
        <Text style={styles.searchButtonText}>
          {t(addIngredientsTranslation.button.find, {
            count: ingredients.length,
          })}
        </Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{t(addIngredientsTranslation.title)}</Text>
        <Text style={styles.subtitle}>
          {t(addIngredientsTranslation.subtitle)}
        </Text>

        {renderTextInput()}
      </View>

      <FlatList
        data={ingredients}
        renderItem={renderIngredientItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
      />

      {renderFindButton()}
    </View>
  );
};

export default AddIngredientsScreen;

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
      height: 80,
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
    removeButton: {
      padding: spacing.xs,
      marginLeft: spacing.xs,
    },
  });
