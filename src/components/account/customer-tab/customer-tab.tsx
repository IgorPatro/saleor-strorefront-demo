import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type MeQuery } from "@/saleor/graphql";
import { useMutation } from "@apollo/client";
import { USER_UPDATE_MUTATION } from "@/graphql/mutations/user/user-update";

interface CustomerTabProps {
  me: MeQuery;
}

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

export const CustomerTab = ({ me }: CustomerTabProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: me?.me?.firstName ?? "",
      lastName: me?.me?.lastName ?? "",
    },
    resolver: zodResolver(formSchema),
  });

  const [updateUser] = useMutation(USER_UPDATE_MUTATION);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = await updateUser({
      variables: values,
    });

    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <Input
          placeholder="First name"
          {...register("firstName")}
          className={errors?.firstName && "border-red-500"}
        />
        <Input
          placeholder="Last name"
          {...register("lastName")}
          className={errors?.lastName && "border-red-500"}
        />
        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
      {me?.me?.email}
    </div>
  );
};
