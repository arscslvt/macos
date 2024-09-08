"use server";

import { IUser } from "@/types/account/user";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/auth-js/src/lib/types";

interface GetUserResponse {
  user: IUser | null;
}

const getUser = async (): Promise<GetUserResponse> => {
  const supabase = createClient();

  const { data: auth_data } = await supabase.auth.getUser();

  if (!auth_data?.user) return { user: null };

  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", auth_data?.user?.id)
    .maybeSingle();

  return {
    user: {
      firstName: data?.full_name?.split(" ")[0] ?? "",
      lastName: data?.full_name?.split(" ")[1] ?? "",

      email: auth_data.user.email,

      avatar: {
        src: data?.avatar_url ?? "",
        height: 40,
        width: 40,
      },
    },
  };
};

export { getUser };
