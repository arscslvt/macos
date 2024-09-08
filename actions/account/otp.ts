"use server";

import { createClient } from "@/utils/supabase/server";

interface RequestOTP {
  email: string;
}

interface RequestOTPResponse {
  message: string;
}

const requestOTP = async ({
  email,
}: RequestOTP): Promise<RequestOTPResponse> => {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
  });

  if (error) {
    throw error;
  }

  return {
    message: `An OTP has been sent to ${email}`,
  };
};

interface VerifyOTP {
  email: string;
  otp: string;
}

interface VerifyOTPResponse {
  message: string;
}

const verifyOTP = async ({
  email,
  otp,
}: VerifyOTP): Promise<VerifyOTPResponse> => {
  const supabase = createClient();

  const { error } = await supabase.auth.verifyOtp({
    email,
    type: "email",
    token: otp,
  });

  if (error) {
    throw error;
  }

  return {
    message: "OTP verified successfully",
  };
};

export { requestOTP, verifyOTP };
