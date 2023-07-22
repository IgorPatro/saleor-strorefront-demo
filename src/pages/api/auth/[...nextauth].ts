import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          console.log("credentials", credentials);

          return {
            id: 1,
            name: "John Doe",
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
