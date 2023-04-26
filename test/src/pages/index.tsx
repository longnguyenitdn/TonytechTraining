import type { ReactElement } from "react";

import type { NextPageWithLayout } from "./_app";
import Layout from "@/components/layout";

const Page: NextPageWithLayout = () => {
  return <p>hello world</p>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
