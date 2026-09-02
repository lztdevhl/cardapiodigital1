import "server-only";
import {SignJWT,jwtVerify} from "jose";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const cookieName="jantinha_admin";
const sessionDurationSeconds=8*60*60;
function key(){const secret=process.env.SESSION_SECRET?.trim();if(!secret)throw new Error("SESSION_SECRET is required.");if(secret.length<32)throw new Error("SESSION_SECRET must contain at least 32 characters.");return new TextEncoder().encode(secret)}
export async function session(id:string){const token=await new SignJWT({id}).setProtectedHeader({alg:"HS256"}).setIssuedAt().setExpirationTime("8h").sign(key());(await cookies()).set(cookieName,token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:sessionDurationSeconds})}
export async function auth(){const token=(await cookies()).get(cookieName)?.value;if(!token)return null;try{const id=(await jwtVerify(token,key())).payload.id;return typeof id==="string"?id:null}catch{return null}}
export async function guard(){if(!await auth())redirect("/admin/login")}
export async function signout(){"use server";await guard();(await cookies()).delete(cookieName);redirect("/admin/login")}
