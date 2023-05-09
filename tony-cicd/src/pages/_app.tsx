import "@/styles/globals.css";
import type { AppProps } from "next/app";
import store from "../redux/store";

import { Provider } from "react-redux";
import Layout from "../components/layouts/main-layout";

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
