import { ApolloProvider } from "@apollo/client";
import { NextPage } from "next";
import { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { client } from "@/utils/apollo-client";
import { twMerge } from "tailwind-merge";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/styles/global.css";
import { Poppins } from "next/font/google";

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

const queryClient = new QueryClient();
const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: ["200", "300", "400", "500", "700"],
});

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout
    ? Component.getLayout
    : defaultGetLayout;

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <ApolloProvider client={client}>
          <main className={twMerge(poppins.className, "font-extralight")}>
            {getLayout(<Component {...pageProps} />)}
          </main>
        </ApolloProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
