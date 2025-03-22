import React, { useLayoutEffect } from "react";
import { useScreenOptions } from "@/core/navigation/utils/useScreenOptions";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import Shimmer from "@/core/ui/components/Shimmer";
import { useTheme } from "@/core/ui/theme/ThemeContext";
import { colors as themeColors } from "@/core/ui/theme/colors";
import { spacing as themeSpacing } from "@/core/ui/theme/spacing";
import { typography as themeTypography } from "@/core/ui/theme/typography";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { useRecipeDetails } from "@/features/recipes/presentation/hooks/useRecipeDetails";
import { RootStackParamList } from "@/core/navigation";
import { container } from "@/core/di/container";
import { TYPES } from "@/core/di/types";
import { TranslationService } from "@/core/common/translation/TranslationService";
import { recipeDetailsTranslation } from "@/features/recipes/presentation/translation/TranslationMapper";
import { Header } from "../components";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

const RecipeDetailsScreen = () => {
  const translationService = container.get<TranslationService>(
    TYPES.TranslationService
  );
  const t = translationService.t;

  const { colors, typography, spacing } = useTheme();
  const styles = makeStyles(colors, typography, spacing);

  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "RecipeDetails">>();

  const { recipeId } = route.params;
  const { recipe, loading, error } = useRecipeDetails(recipeId);

  const { screenOptions } = useScreenOptions({
    headerTitle: () => (
      <Header
        title={recipe ? recipe.title : t(recipeDetailsTranslation.title)}
      />
    ),
    headerTintColor: colors.neutral.black,
  });

  useLayoutEffect(() => {
    const screenOptions: NativeStackNavigationOptions = {
      headerTitle: () => (
        <Header
          title={recipe ? recipe.title : t(recipeDetailsTranslation.title)}
        />
      ),
      headerTintColor: colors.neutral.black,
      headerShown: true,
    };

    navigation.setOptions(screenOptions);
  }, [navigation, screenOptions, recipe]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Shimmer width="100%" height={200} borderRadius={0} />
        <View style={styles.content}>
          <Shimmer width="60%" height={28} borderRadius={4} />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          {t(recipeDetailsTranslation.error)}
        </Text>
      </View>
    );
  }

  if (!recipe) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: recipe.image }}
        style={styles.recipeImage}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.sectionTitle}>
          {t(recipeDetailsTranslation.ingredients)}
        </Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={`0${index}`} style={styles.ingredient}>
            • {ingredient}
          </Text>
        ))}
        <Text style={styles.sectionTitle}>
          {t(recipeDetailsTranslation.instructions)}
        </Text>
        {recipe.instructions.map((instruction, index) => (
          <>
            {instruction.name && (
              <Text key={`1${index}`} style={styles.instructions}>
                {instruction.name}
              </Text>
            )}
            {instruction.steps.map((step, index) => (
              <Text key={`2${index}`} style={styles.instructions}>
                • {step}
              </Text>
            ))}
          </>
        ))}
      </View>
    </ScrollView>
  );
};

export default RecipeDetailsScreen;

const makeStyles = (
  colors: typeof themeColors,
  typography: typeof themeTypography,
  spacing: typeof themeSpacing
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    content: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
      paddingBottom: spacing.md,
    },
    recipeImage: {
      width: "100%",
      height: 200,
    },
    title: {
      fontSize: typography.size["2xl"],
      fontWeight: typography.weight.bold,
      marginBottom: spacing.md,
      color: colors.text.primary,
    },
    sectionTitle: {
      fontSize: typography.size.lg,
      fontWeight: typography.weight.semibold,
      color: colors.text.primary,
      marginBottom: spacing.sm,
      marginTop: spacing.md,
    },
    ingredient: {
      fontSize: typography.size.md,
      color: colors.text.secondary,
      marginBottom: spacing.xs,
    },
    instructions: {
      fontSize: typography.size.md,
      color: colors.text.secondary,
      lineHeight: spacing.md * 1.5,
    },
    errorText: {
      color: colors.semantic.error,
      fontSize: typography.size.md,
      textAlign: "center",
      marginTop: spacing.md,
    },
  });
