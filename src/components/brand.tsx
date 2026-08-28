"use client";
import Image from "next/image";
import {useState} from "react";

export function Brand({compact=false}:{compact?:boolean}){
  const [hasLogo,setHasLogo]=useState(true);
  if(hasLogo)return <Image src="/logo-jantinha-rogerio.png" width={compact?120:180} height={compact?70:105} alt="Jantinha do Rogério" priority className="h-auto object-contain" onError={()=>setHasLogo(false)}/>;
  return <div className="flex items-center gap-3"><span className={compact?"brand-mark !h-11 !w-11 !text-sm":"brand-mark"}>JR</span>{compact&&<span className="display-font text-lg font-bold uppercase leading-tight">Jantinha do<br/>Rogério</span>}</div>;
}
