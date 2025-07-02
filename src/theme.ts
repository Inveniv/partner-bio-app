import {
  configureFonts,
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
} from "react-native-paper";

// Fonts
const baseVariants = configureFonts({
  config: {
    fontFamily: "Poppins-Regular",
  },
});

export const fonts = configureFonts({
  config: {
    ...baseVariants,
    //@ts-expect-error
    medium: {
      fontFamily: "Poppins-Medium",
      fontWeight: "500",
    },
    //@ts-expect-error
    bold: {
      fontFamily: "Poppins-SemiBold",
      fontWeight: "600",
    },
    // Title
    titleLarge: {
      fontFamily: "Poppins-Medium",
      fontSize: 22,
      fontWeight: "500",
      letterSpacing: 0,
      lineHeight: 28,
    },
    //
    headlineSmall: {
      fontFamily: "Poppins-Medium",
      fontSize: 20,
      fontWeight: "500",
      letterSpacing: 0,
      lineHeight: 24,
    },
  },
});

export const DarkTheme: MD3Theme = {
  ...MD3DarkTheme,
  // myOwnProperty: true,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#FFFFFF",
    onPrimary: "#000000",
    // primaryContainer: 'rgb(95, 43, 146)',
    // onPrimaryContainer: 'rgb(240, 219, 255)',
    // secondary: 'rgb(208, 193, 218)',
    // onSecondary: 'rgb(54, 44, 63)',
    // secondaryContainer: 'rgb(77, 67, 87)',
    // onSecondaryContainer: 'rgb(237, 221, 246)',
    // tertiary: 'rgb(243, 183, 190)',
    // onTertiary: 'rgb(75, 37, 43)',
    // tertiaryContainer: 'rgb(101, 58, 65)',
    // onTertiaryContainer: 'rgb(255, 217, 221)',
    error: "#E43232",
    // onError: 'rgb(105, 0, 5)',
    // errorContainer: 'rgb(147, 0, 10)',
    // onErrorContainer: 'rgb(255, 180, 171)',
    background: "#1D1D1E",
    onBackground: "#FFFFFF",
    surface: "#000000",
    secondary: "#898989",
    tertiary: "#2978F3",
    // onSurface: 'rgb(231, 225, 229)',
    // surfaceVariant: 'rgb(74, 69, 78)',
    // onSurfaceVariant: 'rgb(204, 196, 206)',
    // outline: 'rgb(150, 142, 152)',
    // outlineVariant: 'rgb(74, 69, 78)',
    // shadow: 'rgb(0, 0, 0)',
    // scrim: 'rgb(0, 0, 0)',
    // inverseSurface: 'rgb(231, 225, 229)',
    // inverseOnSurface: 'rgb(50, 47, 51)',
    // inversePrimary: 'rgb(120, 69, 172)',
    // elevation: {
    //   level0: 'transparent',
    //   level1: 'rgb(39, 35, 41)',
    //   level2: 'rgb(44, 40, 48)',
    //   level3: 'rgb(50, 44, 55)',
    //   level4: 'rgb(52, 46, 57)',
    //   level5: 'rgb(56, 49, 62)',
    // },
    // surfaceDisabled: 'rgba(231, 225, 229, 0.12)',
    // onSurfaceDisabled: 'rgba(231, 225, 229, 0.38)',
    backdrop: "#ffffff66",
  },
  fonts,
  roundness: 10,
};

export const LightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#000000",
    onPrimary: "#FFFFFF",
    // primaryContainer: 'rgb(95, 43, 146)',
    // onPrimaryContainer: 'rgb(240, 219, 255)',
    // secondary: 'rgb(208, 193, 218)',
    // onSecondary: 'rgb(54, 44, 63)',
    // secondaryContainer: 'rgb(77, 67, 87)',
    // onSecondaryContainer: 'rgb(237, 221, 246)',
    // tertiary: 'rgb(243, 183, 190)',
    // onTertiary: 'rgb(75, 37, 43)',
    // tertiaryContainer: 'rgb(101, 58, 65)',
    // onTertiaryContainer: 'rgb(255, 217, 221)',
    error: "#E43232",
    // onError: 'rgb(105, 0, 5)',
    // errorContainer: 'rgb(147, 0, 10)',
    // onErrorContainer: 'rgb(255, 180, 171)',
    background: "#EBEDEF",
    onBackground: "#000000",
    surface: "#1D1F28",
    secondary: "#D4D0CC",
    tertiary: "#02BC49",
    // onSurface: 'rgb(231, 225, 229)',
    // surfaceVariant: 'rgb(74, 69, 78)',
    // onSurfaceVariant: 'rgb(204, 196, 206)',
    // outline: 'rgb(150, 142, 152)',
    // outlineVariant: 'rgb(74, 69, 78)',
    // shadow: 'rgb(0, 0, 0)',
    // scrim: 'rgb(0, 0, 0)',
    // inverseSurface: 'rgb(231, 225, 229)',
    // inverseOnSurface: 'rgb(50, 47, 51)',
    // inversePrimary: 'rgb(120, 69, 172)',
    // elevation: {
    //   level0: 'transparent',
    //   level1: 'rgb(39, 35, 41)',
    //   level2: 'rgb(44, 40, 48)',
    //   level3: 'rgb(50, 44, 55)',
    //   level4: 'rgb(52, 46, 57)',
    //   level5: 'rgb(56, 49, 62)',
    // },
    // surfaceDisabled: 'rgba(231, 225, 229, 0.12)',
    // onSurfaceDisabled: 'rgba(231, 225, 229, 0.38)',
    backdrop: "#332f3766",
  },
  fonts,
  roundness: 10,
};
