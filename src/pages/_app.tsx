import { ApolloProvider } from "@apollo/client";
import { NextPage } from "next";
import { AppProps } from "next/app";
import Script from "next/script";
import React, { ReactElement, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { client } from "@/utils/apollo-client";
import "@/styles/global.css";

import { Layout } from "@/components/layout";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const defaultGetLayout = (page: ReactNode): ReactNode => {
  return <Layout>{page}</Layout>;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout
    ? Component.getLayout
    : defaultGetLayout;

  return (
    <>
      <SessionProvider session={session}>
        <ApolloProvider client={client}>
          {getLayout(<Component {...pageProps} />)}
        </ApolloProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
