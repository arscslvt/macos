"use client";

import React, { useEffect } from "react";

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
import { requestOTP, verifyOTP } from "@/actions/account/otp";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateAccount } from "@/actions/account/update";
import { toast } from "sonner";
import AppIcon from "@/components/ui/icon";
import { ToastTitle } from "@/components/ui/sonner";
import { useSetupScreens } from "@/hooks/setup.hook";

const formSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email is required",
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

const otpSchema = z.object({
  otp: z.string().min(6, {
    message: "OTP is required",
  }),
});

export default function CloudAccountCreation() {
  const { handleScreenNavigation } = useSetupScreens();

  const [otpDialogOpen, setOtpDialogOpen] = React.useState(false);
  const [otp, setOtp] = React.useState<string | null>(null);

  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setLoading(true);

    try {
      const { message } = await requestOTP({
        email: values.email,
      });

      console.log(message);

      setOtpDialogOpen(true);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  async function onOtpSubmit(values: z.infer<typeof otpSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setLoading(true);

    try {
      const { message } = await verifyOTP({
        email: form.getValues("email"),
        otp: values.otp,
      });

      console.log(message);

      setOtpDialogOpen(false);

      const { data } = await updateAccount({
        full_name: `${form.getValues("firstName")} ${form.getValues(
          "lastName"
        )}`,
        username: form.getValues("username"),
      });

      handleScreenNavigation({ action: "next" });
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  useEffect(() => {
    toast(<ToastTitle>This is a notification</ToastTitle>, {
      duration: 5000 * 20,
    });
  }, []);

  return (
    <Window
      style={"empty"}
      size={"medium"}
      resizable={"locked"}
      className="min-w-[800px] flex flex-col"
    >
      <Dialog open={otpDialogOpen} onOpenChange={setOtpDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>OTP sent to your email</DialogTitle>
            <DialogDescription>
              A code has been sent to {form.getValues("email")}. Check your
              inbox and enter the OTP code to verify your account.
            </DialogDescription>
          </DialogHeader>

          <Form {...otpForm}>
            <form
              className="w-full"
              onSubmit={otpForm.handleSubmit(onOtpSubmit)}
            >
              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <div>
                    <div className="flex items-center">
                      <Text
                        variant={"subheadline"}
                        foreground={"muted"}
                        alignment={"right"}
                        className="mr-2 w-max"
                      >
                        OTP:
                      </Text>
                      <Input
                        {...field}
                        type="text"
                        variant={"default"}
                        placeholder="123456"
                        className="w-full remove-appearance"
                        maxLength={6}
                        pattern="\d*"
                        autoFocus
                      />
                    </div>
                    <FormMessage {...field} className="text-right max-w-full" />
                  </div>
                )}
              />

              <DialogFooter className="pt-6">
                <DialogClose asChild>
                  <Button variant={"default"} tint={"secondary"} size={"small"}>
                    Close
                  </Button>
                </DialogClose>
                <Button type="submit" variant={"default"} size={"small"}>
                  Confirm
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
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
                Create a new Cloud ID
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
                This Mac will be associated with your Cloud ID and data such as
                photos, contacts,
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
