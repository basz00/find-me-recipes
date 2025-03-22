import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { colors as themeColors } from "@/core/ui/theme/colors";
import { spacing as themeSpacing } from "@/core/ui/theme/spacing";
import { typography as themeTypography } from "@/core/ui/theme/typography";
import { useTheme } from "@/core/ui/theme/ThemeContext";

const Header = (props: { title: String; subtitle?: String }) => {
  const { title, subtitle } = props;
  const { colors, typography, spacing } = useTheme();
  const styles = makeStyles(colors, typography, spacing);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && subtitle.length > 0 && (
        <Text style={styles.subtitle}>{subtitle}</Text>
      )}
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
      justifyContent: "center",
    },
    title: {
      fontSize: typography.size["2xl"],
      fontWeight: typography.weight.bold,
      color: colors.text.primary,
    },
    subtitle: {
      fontSize: typography.size.sm,
      color: colors.text.secondary,
      marginBottom: spacing.md,
    },
  });

export default Header;
