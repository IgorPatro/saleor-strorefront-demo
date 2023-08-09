import React from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useApolloClient } from "@apollo/client";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export const SignInForm = () => {
  const { push } = useRouter();
  const client = useApolloClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await signIn("credentials", {
      redirect: false,
      ...values,
    });

    if (result?.ok) {
      await client.resetStore();

      push({
        pathname: "/",
      });
    }
    if (result?.error) {
      console.log(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-md">
      <Input
        placeholder="Email"
        {...register("email")}
        className={errors?.email && "border-red-500"}
      />
      <Input
        placeholder="Password"
        type="password"
        {...register("password")}
        className={errors?.password && "border-red-500"}
      />
      <Button type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </form>
  );
};
