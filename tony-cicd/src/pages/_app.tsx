import "@/styles/globals.css";
import type { AppProps } from "next/app";
import store from "../redux/store";
import { Provider, useSelector } from "react-redux";

import Layout from "../components/layouts/main-layout";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
