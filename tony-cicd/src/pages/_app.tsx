import "@/styles/globals.css";
import type { AppProps } from "next/app";
import store from "../redux/store";
import type { NextPage } from "next";

import { Provider } from "react-redux";
import Layout from "../components/layouts/main-layout";
// import { ReactElement, ReactNode } from "react";

type AppPropsWithLayout = AppProps & {
  Component: any;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const LayoutWrapper = Component.getLayout ? Component.getLayout() : Layout;

  return (
    <Provider store={store}>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </Provider>
  );
}
