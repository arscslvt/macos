import React from "react";
import { useSignIn, useUser } from "@clerk/clerk-react";
import { UserResource } from "@clerk/types";
import {
  createUser,
  CreateUserRequest,
  CreateUserResponse,
} from "@/actions/auth/create-user";
import { toast } from "sonner";
import Link from "next/link";
import { FaCompass } from "react-icons/fa";
import { User } from "@clerk/nextjs/server";

interface AccountContext {
  user: UserResource | null | undefined;
  isLoaded: boolean;
  isSignedIn: boolean;

  requestUserRegistration: (props: CreateUserRequest) => Promise<User | null>;
}

export const AccountContext = React.createContext<AccountContext>(
  {} as AccountContext
);

interface AccountProviderProps {
  children: React.ReactNode;
}

export default function AccountProvider({ children }: AccountProviderProps) {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signIn, setActive } = useSignIn();

  const requestUserRegistration = async (props: CreateUserRequest) => {
    const { user }: CreateUserResponse = await createUser(props).catch(
      (error) => {
        toast.error(error.message, {
          description: "Try again in a bit, or contact support if it persists.",
        });
        return error;
      }
    );

    console.log(user);

    if (!user) {
      toast.error("Failed to create user", {
        description: "Try again in a bit, or contact support if it persists.",
      });
      return null;
    }

    const signInAttempt = await signIn
      ?.create({
        identifier: user.emailAddresses[0].emailAddress,
        password: props.password,
      })
      .catch((error) => {
        toast.error(error.message, {
          description: "Try again in a bit, or contact support if it persists.",
        });
        return error;
      });

    if (signInAttempt?.status !== "complete") {
      toast.error("Failed to create a valid session for your user", {
        description:
          "Contact support if it persists. You may to refer this error message: " +
          signInAttempt?.status,
      });

      return null;
    }

    await setActive?.({
      session: signInAttempt.createdSessionId,
    });

    toast.success("Welcome to Sierra OS, " + user.firstName, {
      icon: <FaCompass />,
      description: (
        <>
          If you want to know more, visit{" "}
          <Link
            href={"https://discover.sierraos.com"}
            className="font-medium text-foreground"
          >
            discover.sierraos.com
          </Link>
        </>
      ),
    });

    return user;
  };

  return (
    <AccountContext.Provider
      value={{
        user,
        isLoaded,
        isSignedIn: isSignedIn ?? false,

        requestUserRegistration,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}
