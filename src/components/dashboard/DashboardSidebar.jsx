import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SidebarUI from "./SidebarUI";

export default async function DashboardSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const role = user?.role || "user"; 

  return <SidebarUI role={role} />;
}