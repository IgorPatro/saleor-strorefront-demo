import React from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const SignInPage = () => {
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
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
      push({
        pathname: "/",
      });
    }
    if (result?.error) {
      console.log(result.error);
    }
  };

  return (
    <div className="p-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-md"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => <Input placeholder="Email" {...field} />}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <Input placeholder="Password" type="password" {...field} />
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default SignInPage;
