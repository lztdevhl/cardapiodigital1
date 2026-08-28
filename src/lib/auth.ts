import {SignJWT,jwtVerify} from "jose";import {cookies} from "next/headers";import {redirect} from "next/navigation";
const n="jantinha_admin";const key=()=>new TextEncoder().encode(process.env.SESSION_SECRET!);
export async function session(id:string){const v=await new SignJWT({id}).setProtectedHeader({alg:"HS256"}).setExpirationTime("8h").sign(key());(await cookies()).set(n,v,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/"})}
export async function auth(){const v=(await cookies()).get(n)?.value;if(!v)return null;try{return (await jwtVerify(v,key())).payload.id as string}catch{return null}}
export async function guard(){if(!await auth())redirect("/admin/login")}
export async function signout(){"use server";(await cookies()).delete(n);redirect("/admin/login")}
