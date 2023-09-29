"use client";
import { FC, ReactNode, useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database.types";
interface ISupabaseProviderProps {
  children: ReactNode;
}
const SupabaseProvider: FC<ISupabaseProviderProps> = ({ children }) => {
  const [supabaseClient, setSupabaseClient] = useState(() => {
    return createClientComponentClient<Database>();
  });
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
};
export default SupabaseProvider;
