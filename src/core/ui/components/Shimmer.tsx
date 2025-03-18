import { colors as themeColors } from "@/core/ui/theme/colors";
import React, { useEffect } from "react";
import {
  AnimatableNumericValue,
  Animated,
  DimensionValue,
  Easing,
  StyleSheet,
  View,
} from "react-native";
import { useTheme } from "../theme/ThemeContext";

const Shimmer = ({
  width,
  height,
  borderRadius,
}: {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: string | AnimatableNumericValue;
}) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const shimmerAnimation = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnimation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <View
      style={[
        styles.container,
        {
          width: width || "auto",
          height: height || "auto",
          borderRadius: borderRadius || 0,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
};

const makeStyles = (colors: typeof themeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.neutral.grey[100],
      overflow: "hidden",
      position: "relative",
    },
    shimmer: {
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      backgroundColor: colors.neutral.grey[200],
    },
  });

export default Shimmer;
