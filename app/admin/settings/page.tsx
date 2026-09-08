import { createServerSupabaseClient } from "@/lib/supabase/server-auth";
import ChangePasswordForm from "./ChangePasswordForm";

export default async function AdminSettingsPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mx-auto max-w-md px-6 py-10">
      <h1 className="text-3xl">Account Settings</h1>
      <p className="mt-2 text-sm text-body">Signed in as {user?.email}</p>

      <div className="mt-8">
        <h2 className="text-xl">Change Password</h2>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
