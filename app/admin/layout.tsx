import { createServerSupabaseClient } from "@/lib/supabase/server-auth";
import SignOutButton from "./SignOutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return children;
  }

  return (
    <div>
      <div className="flex items-center justify-between border-b border-border-soft bg-surface px-6 py-3">
        <span className="wordmark text-lg text-heading">peaceflow admin</span>
        <div className="flex items-center gap-4 text-sm text-body">
          <span>{user.email}</span>
          <SignOutButton />
        </div>
      </div>
      {children}
    </div>
  );
}
