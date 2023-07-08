import { useSaleorAuthContext } from "@saleor/auth-sdk/react";

export const getServerSideProps = async (ctx) => {
  console.log(ctx);

  return {
    props: {},
  };
};

export default function Home() {
  const { signIn } = useSaleorAuthContext();

  const login = async () => {
    const data = await signIn({
      email: "i.patro@wp.pl",
      password: "pass12345678",
    });

    console.log(data);
  };

  return (
    <div>
      <h1>Hello world!</h1>
      <button onClick={login}>Login</button>
    </div>
  );
}
