import CONF from "@/conf/conf";
import { UserCredential } from "@/types/type";
import { createClient } from "@supabase/supabase-js";

export class AuthService {
  supabase;

  constructor() {
    this.supabase = createClient(CONF.supabase.url, CONF.supabase.anonKey);
  }

  async signUpNewUser({ email, password, redirectTo }: UserCredential) {
    return await this.supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectTo,
      },
    });
  }

  async signInWithEmail({ email, password }: UserCredential) {
    return await this.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  }

  async signOut() {
    return await this.supabase.auth.signOut();
  }

  async getSession() {
    return await this.supabase.auth.getSession();
  }

  async getUser() {
    return await this.supabase.auth.getUser();
  }
}

const authService = new AuthService();
export default authService;
