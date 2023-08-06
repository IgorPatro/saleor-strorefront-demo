import React from "react";
import { type GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useQuery } from "@apollo/client";
import { ME_QUERY } from "@/graphql/queries/me";
import { Input } from "@/components/ui/input";

import { AddressTab } from "@/components/account/address-tab";
import { CustomerTab } from "@/components/account/customer-tab";
import { OrdersTab } from "@/components/account/orders-tab";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({
    req: ctx.req,
  });

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/signin",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {},
  };
};

const AccountPage = () => {
  const { data: me } = useQuery(ME_QUERY);

  console.log(me);

  if (!me) {
    return <div>You are not logged in. Please log in to see your account.</div>;
  }

  return (
    <div>
      <Tabs defaultValue="customer" className="flex items-start gap-10">
        <TabsList className="flex flex-col gap-2 h-auto bg-transparent">
          <TabsTrigger className="w-full" value="customer">
            Customer
          </TabsTrigger>
          <TabsTrigger className="w-full" value="address">
            Address
          </TabsTrigger>
          <TabsTrigger className="w-full" value="orders">
            Orders
          </TabsTrigger>
          <Button
            className="w-full"
            variant="destructive"
            onClick={() => signOut()}
          >
            Log out
          </Button>
        </TabsList>
        <TabsContent value="customer">
          <CustomerTab me={me} />
        </TabsContent>
        <TabsContent value="address">
          <AddressTab me={me} />
        </TabsContent>
        <TabsContent className="w-full" value="orders">
          <OrdersTab me={me} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountPage;
