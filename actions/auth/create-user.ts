"use server";

import { auth, clerkClient, User } from "@clerk/nextjs/server";

interface CreateUserRequest {
  username: string;
  emailAddress: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

interface CreateUserResponse {
  message: string;
  user?: User;
}

export const createUser = async (
  props: CreateUserRequest
): Promise<CreateUserResponse> => {
  const client = await clerkClient();
  const { emailAddress, username, password, firstName, lastName } = props;

  if (!emailAddress || !password) {
    throw new Error("Email address and password are required", {
      cause: "RequiredFields",
    });
  }

  const user = await client.users
    .createUser({
      username: username,
      emailAddress: [emailAddress],
      password: password,
      firstName: firstName,
      lastName: lastName,
    })
    .catch((error) => {
      console.error("Clerk API Error:", JSON.stringify(error, null, 2));
      throw new Error(error.message, { cause: "CreateUserError" });
    });

  return { message: "User created successfully", user: structuredClone(user) };
};

export type { CreateUserRequest, CreateUserResponse };
