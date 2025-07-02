import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

export const LocaleContext = createContext({
  changeLocale: (_locale: "en" | "es") => {},
  locale: "en" as "en" | "es",
});

const LocaleProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [locale, setLocale] = useState<"en" | "es">("en"); // default to English

  useEffect(() => {
    const loadLocale = async () => {
      const storedLocale = (await AsyncStorage.getItem("locale")) as
        | "en"
        | "es";
      if (storedLocale) {
        setLocale(storedLocale);
      }
    };

    loadLocale();
  }, []);

  const changeLocale = async (newLocale: "en" | "es") => {
    setLocale(newLocale);
    await AsyncStorage.setItem("locale", newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleProvider;
