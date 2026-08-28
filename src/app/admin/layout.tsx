import {guard,signout} from "@/lib/auth";
import {AdminShell} from "@/components/admin/admin-shell";
export default async function Layout({children}:{children:React.ReactNode}){await guard();return <AdminShell signout={signout}>{children}</AdminShell>}
