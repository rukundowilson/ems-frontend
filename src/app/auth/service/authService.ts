import api from "@/app/shared/services/axios";
import type { SignInPayload,SignUpPayload,AuthResponse } from "../types/authTypes";

export async function signIn(payload: SignInPayload): Promise<AuthResponse> {
  const res = await api.post('/auth/login', payload);
  return res.data;
}

export async function signUp(payload: SignUpPayload): Promise<AuthResponse> {
  const res = await api.post('/auth/signup', payload);
  return res.data;
}

export default { signIn, signUp };
