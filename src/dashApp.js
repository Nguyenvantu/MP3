import React from "react";
import { Provider } from "react-redux";
import { store, history } from "./redux/store";
import PublicRoutes from "./router";
import i18n from "./languageProvider/i18n";
import { I18nextProvider } from "react-i18next";
import Boot from "./redux/boot";
import { ThemeProvider } from "styled-components";
import themes from "./settings/theme";
import "./styles/base.sass";

const DashApp = () => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={themes}>
        <PublicRoutes history={history} />
      </ThemeProvider>
    </I18nextProvider>
  </Provider>
);

Boot().then(DashApp);

export default DashApp;
