import { TranslationService } from "@/core/common/translation/TranslationService";
import { container } from "@/core/di/container";
import { TYPES } from "@/core/di/types";
import { RootStackParamList } from "@/core/navigation";
import { useScreenOptions } from "@/core/navigation/utils/useScreenOptions";
import { suggestRecipesTranslation } from "@/features/recipes/presentation/translation/TranslationMapper";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useLayoutEffect } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Shimmer from "../../../../core/ui/components/Shimmer";
import { useTheme } from "../../../../core/ui/theme/ThemeContext";
import { colors as themeColors } from "../../../../core/ui/theme/colors";
import { spacing as themeSpacing } from "../../../../core/ui/theme/spacing";
import { typography as themeTypography } from "../../../../core/ui/theme/typography";
import { Header } from "../components";
import { useSuggestRecipes } from "../hooks/useSuggestRecipes";

const SuggestRecipesScreen = () => {
  const translationService = container.get<TranslationService>(
    TYPES.TranslationService
  );
  const t = translationService.t;

  const { colors, typography, spacing } = useTheme();
  const route = useRoute<RouteProp<RootStackParamList, "SuggestRecipes">>();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, "RecipeDetails">
    >();
  const { screenOptions } = useScreenOptions({
    headerTitle: () => (
      <Header
        title={t(suggestRecipesTranslation.title)}
        subtitle={t(suggestRecipesTranslation.subtitle)}
      />
    ),
    headerTintColor: colors.neutral.black,
  });

  const { ingredients } = route.params;
  const { execute, recipes, loading } = useSuggestRecipes();

  const styles = makeStyles(colors, typography, spacing);

  useEffect(() => {
    execute(ingredients);
  }, [ingredients]);

  useLayoutEffect(() => {
    navigation.setOptions(screenOptions());
  }, [navigation, screenOptions]);

  const renderRecipeItem = (
    id: number,
    name: string,
    image: string,
    ingredients: string[]
  ) => (
    <Pressable
      style={({ pressed }) => [
        styles.recipeItem,
        { opacity: pressed ? 0.5 : 1 },
      ]}
      testID={`recipe-item-${id}`}
      onPress={() => {
        navigation.navigate("RecipeDetails", {
          recipeId: id,
        });
      }}
    >
      <View style={styles.recipeContent}>
        <Image
          source={{ uri: image }}
          style={styles.recipeImage}
          resizeMode="stretch"
        />
        <View style={styles.recipeText}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.recipeTitle}
          >
            {name}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.recipeIngredients}
          >
            {ingredients.join(", ")}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={loading ? [...Array(5)] : recipes}
        renderItem={({ item, index }) =>
          loading ? (
            <Shimmer width={"100%"} height={80} borderRadius={8} />
          ) : (
            renderRecipeItem(
              item.id || index,
              item.name || "",
              item.image || "",
              item.ingredients || []
            )
          )
        }
        keyExtractor={(item, index) => (loading ? `shimmer-${index}` : item.id)}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default SuggestRecipesScreen;

const makeStyles = (
  colors: typeof themeColors,
  typography: typeof themeTypography,
  spacing: typeof themeSpacing
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
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
    recipeItem: {
      backgroundColor: colors.neutral.grey[100],
      padding: spacing.xs,
      borderRadius: spacing.xs,
      justifyContent: "center",
      height: 80,
    },
    recipeTitle: {
      fontSize: typography.size.lg,
      fontWeight: typography.weight.semibold,
      color: colors.text.primary,
      marginBottom: spacing.xs,
    },
    recipeIngredients: {
      fontSize: typography.size.sm,
      color: colors.text.secondary,
    },
    recipeContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
    },
    recipeImage: {
      width: 50,
      height: 50,
      borderRadius: spacing.xs,
    },
    recipeText: {
      flex: 1,
    },
  });
