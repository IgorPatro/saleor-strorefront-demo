import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { serverClient, client } from "@/utils/apollo-client";
import { SIGNIN_MUTATION } from "@/graphql/mutations/signin";
import { type DefaultSession } from "next-auth";

export const authOptions = {
  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        return {
          ...token,
          ...user,
        };
      }

      return token;
    },
    session: ({ session, token }: any) => {
      const user = token.user;
      return {
        ...token,
        ...session,
        user: {
          ...user,
          ...session.user,
        },
      };
    },
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { data } = await client.mutate({
          mutation: SIGNIN_MUTATION,
          variables: credentials,
        });

        if (data?.tokenCreate && data.tokenCreate.errors.length > 0) {
          throw new Error("Invalid credentials custom error");
        }

        if (data?.tokenCreate?.token && data?.tokenCreate?.user) {
          const { token, user } = data.tokenCreate;

          return {
            token: token,
            id: "uuid",
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            user: {
              uuid: "uuid",
              fullName: `${user.firstName} ${user.lastName}`,
              email: user.email,
            },
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
};

export default NextAuth(authOptions);

declare module "next-auth" {
  interface Session {
    token: string;
    user: {
      uuid: string;
      fullName: string;
      email: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    token: string;
    user: {
      uuid: string;
      fullName: string;
      email: string;
    };
  }
}
