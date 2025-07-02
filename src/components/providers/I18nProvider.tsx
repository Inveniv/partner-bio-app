// import "components/forms/yupErrorMessages";

import React, { FC, PropsWithChildren, useContext } from "react";
import { IntlProvider } from "react-intl";
import enMessages from "translations/en.json";
import esMessages from "translations/es.json";
import fallbackTranslations from "utils/translations/fallbackTranslations";

import { LocaleContext } from "./LocaleProvider";

export const allMessages: { [key: string]: any } = {
  en: enMessages,
  es: esMessages,
};

const I18nProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  // in case there is untranslated message, fallback it to english
  const { locale } = useContext(LocaleContext);
  const messages = fallbackTranslations(
    allMessages[locale] || allMessages.en,
    allMessages[locale],
  );

  return (
    <IntlProvider locale={"es"} messages={messages}>
      {children}
    </IntlProvider>
  );
};

export default I18nProvider;
