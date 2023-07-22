import React from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const SignInPage = () => {
  const { push } = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = async () => {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      push({
        pathname: "/",
      });
    }
    if (result?.error) {
      console.log(result.error);
    }
  };

  return (
    <div>
      SignInPage
      <br />
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => login()}>Login</button>
    </div>
  );
};

export default SignInPage;
