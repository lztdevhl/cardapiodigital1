import "./globals.css";
import type {Metadata} from "next";
export const metadata:Metadata={title:{default:"Jantinha do Rogério",template:"%s | Jantinha do Rogério"},description:"Cardápio digital da Jantinha do Rogério"};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="pt-BR" data-scroll-behavior="smooth"><body>{children}</body></html>}
