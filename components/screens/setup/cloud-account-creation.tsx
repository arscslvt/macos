"use client";

import React from "react";

import Text from "@/components/typography";
import Button from "@/components/ui/button";
import Window from "@/components/windows/window";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormMessage } from "@/components/ui/form";

import { HiCloudArrowUp } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { BsFillPeopleFill } from "react-icons/bs";
import { useSetupScreens } from "@/hooks/setup.hook";
import { useAccount } from "@/hooks/account.hook";

const formSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, {
      message: "Email is required",
    })
    .min(4, {
      message: "Email must be at least 4 characters",
    }),

  password: z.string().min(8, {
    message: "Must be at least 8 characters",
  }),

  username: z
    .string()
    .min(1, {
      message: "Username is required",
    })
    .max(35, {
      message: "Username is too long",
    })
    .regex(/^[a-zA-Z0-9_]*$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),

  firstName: z
    .string()
    .min(1, {
      message: "First name is required",
    })
    .max(35, {
      message: "First name is too long",
    }),

  lastName: z.string().max(35, {
    message: "Last name is too long",
  }),
});

export default function CloudAccountCreation() {
  const { handleScreenNavigation } = useSetupScreens();
  const { requestUserRegistration } = useAccount();

  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setLoading(true);

    const user = await requestUserRegistration({
      username: values.username,
      emailAddress: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
    });

    if (!user) {
      setLoading(false);
      form?.reset();
    }

    if (user) {
      handleScreenNavigation({ action: "next" });
    }

    setLoading(false);
  }

  return (
    <Window
      style={"empty"}
      size={"medium"}
      resizable={"locked"}
      className="min-w-[800px] flex flex-col"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col flex-1"
        >
          <div className="w-full flex flex-col flex-1 items-center py-8 px-[16%] gap-6">
            <div className="flex flex-col items-center gap-4">
              <HiCloudArrowUp
                className="w-20 h-20 text-accent"
                strokeWidth={0}
              />
              <Text variant={"title1"} weight={"emphasized"}>
                Create a new Sierra ID
              </Text>
            </div>

            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <div className="w-80">
                    <div className="flex items-center">
                      <Text
                        variant={"body"}
                        alignment={"right"}
                        className="mr-2 w-32"
                      >
                        Username
                      </Text>
                      <Input
                        {...field}
                        type="text"
                        variant={"default"}
                        placeholder="stevejobs"
                        className="w-60"
                      />
                    </div>
                    <FormMessage {...field} className="text-right max-w-full" />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div className="w-80">
                    <div className="flex items-center">
                      <Text
                        variant={"body"}
                        alignment={"right"}
                        className="mr-2 w-32"
                      >
                        Password
                      </Text>
                      <Input
                        {...field}
                        type="password"
                        variant={"default"}
                        placeholder="••••••••"
                        className="w-60"
                      />
                    </div>
                    <FormMessage {...field} className="text-right max-w-full" />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="w-80">
                    <div className="flex items-center">
                      <Text
                        variant={"body"}
                        alignment={"right"}
                        className="mr-2 w-32"
                      >
                        Email
                      </Text>
                      <Input
                        {...field}
                        type="email"
                        variant={"default"}
                        placeholder="steve@cloud.com"
                        className="w-60"
                      />
                    </div>
                    <FormMessage {...field} className="text-right max-w-full" />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <div className="w-80">
                    <div className="flex items-center">
                      <Text
                        variant={"body"}
                        alignment={"right"}
                        className="mr-2 w-32"
                      >
                        First Name
                      </Text>
                      <Input
                        {...field}
                        type="text"
                        variant={"default"}
                        placeholder="Steve"
                        className="w-60"
                      />
                    </div>
                    <FormMessage {...field} className="text-right max-w-full" />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <div className="w-80">
                    <div className="flex items-center">
                      <Text
                        variant={"body"}
                        alignment={"right"}
                        className="mr-2 w-32"
                      >
                        Last Name
                      </Text>
                      <Input
                        {...field}
                        type="text"
                        variant={"default"}
                        placeholder="Jobs"
                        className="w-60"
                      />
                    </div>
                    <FormMessage {...field} className="text-right max-w-full" />
                  </div>
                )}
              />
            </div>
          </div>

          <div>
            <div className="flex flex-col items-center gap-1 pb-4">
              <BsFillPeopleFill
                className="w-5 h-5 text-accent"
                strokeWidth={0}
              />

              <Text variant={"footnote"} foreground={"muted"} className="mt-1">
                This computer will be associated with your Sierra ID and data
                such as photos, contacts,
                <br /> and documents will be synced to Cloud so you can access
                them on other devices.
              </Text>

              <Button variant={"text"} className="h-max">
                See how your data is managed
              </Button>
            </div>
            <div className="px-4 py-3 border-t flex gap-2 justify-end">
              <Button
                onClick={() =>
                  handleScreenNavigation({
                    action: "previous",
                  })
                }
                variant={"default"}
                tint={"secondary"}
              >
                Back
              </Button>
              <Button
                type="submit"
                // onClick={() => handleScreenNavigation({ action: "next" })}
                variant={"default"}
                tint={"secondary"}
              >
                Create Account
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Window>
  );
}
