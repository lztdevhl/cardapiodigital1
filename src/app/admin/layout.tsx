import {guard,signout} from "@/lib/auth";
import {AdminShell} from "@/components/admin/admin-shell";
export const dynamic="force-dynamic";
export default async function Layout({children}:{children:React.ReactNode}){await guard();return <AdminShell signout={signout}>{children}</AdminShell>}
