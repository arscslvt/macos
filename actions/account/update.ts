"use server";

import { DatabaseCloudAccount } from "@/types/account/cloud";
import { createClient } from "@/utils/supabase/server";

interface UpdateAccountResponse {
  data: DatabaseCloudAccount;
}

const updateAccount = async (
  data: Partial<DatabaseCloudAccount>
): Promise<UpdateAccountResponse> => {
  const supabase = createClient();

  const { data: auth } = await supabase.auth.getUser();

  if (!auth) throw new Error("User not found");

  const { data: profile_data, error } = await supabase
    .from("profiles")
    .update(data)
    .eq("id", auth.user?.id)
    .select()
    .maybeSingle();

  if (error) {
    throw error;
  }

  return { data: profile_data };
};

export { updateAccount };
