import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  type FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { StatusBar, useColorScheme } from "react-native";
import { ThemeProvider as PaperThemeProvider } from "react-native-paper";
import { DarkTheme, LightTheme } from "theme";

const DEFAULT_THEME = "system";
export const ThemeContext = createContext({
  toggleTheme: () => {},
  handleChoseTheme: (_theme: string) => {},
  choosenTheme: DEFAULT_THEME,
});

const ThemeProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [choosenTheme, setChoosenTheme] = useState(DEFAULT_THEME);

  // On load read theme from async storage
  useEffect(() => {
    (async function () {
      setChoosenTheme((await AsyncStorage.getItem("theme")) || DEFAULT_THEME);
    })();
  }, []);

  const themeStyle = useMemo(() => {
    switch (choosenTheme) {
      case "system":
        return systemColorScheme ?? "light";
      default:
        return choosenTheme;
    }
  }, [choosenTheme, systemColorScheme]);

  // Create callback
  const toggleTheme = useCallback(async () => {
    const toggledTheme = themeStyle === "light" ? "dark" : "light";
    setChoosenTheme(toggledTheme);
    await AsyncStorage.setItem("theme", toggledTheme);
  }, [themeStyle]);

  const handleChoseTheme = useCallback(async (theme: string) => {
    setChoosenTheme(theme);
    await AsyncStorage.setItem("theme", theme);
  }, []);

  // Logic for choosings theme
  const theme = useMemo(() => {
    // switch (themeStyle) {
    //   case "dark":
    //     return DarkTheme;
    //   case "light":
    //     return LightTheme;
    //   default:
    //     return;
    // }
    return LightTheme;
  }, [themeStyle]);

  // Create Context
  const themeContext = useMemo(
    () => ({
      toggleTheme,
      choosenTheme,
      handleChoseTheme,
    }),
    [toggleTheme, choosenTheme, handleChoseTheme],
  );

  return (
    <ThemeContext.Provider value={themeContext}>
      <StatusBar
        barStyle={`${themeStyle === "dark" ? "light" : "dark"}-content`}
      />
      <PaperThemeProvider theme={theme}>{children}</PaperThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
