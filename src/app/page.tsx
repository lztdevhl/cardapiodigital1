import {prisma} from "@/lib/prisma";
import {Brand} from "@/components/brand";
import {MenuExperience,type MenuCategory} from "@/components/menu/menu-experience";
import {AtSign as Instagram,Clock3,MapPin} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Page(){
  const [storedSettings,categories]=await Promise.all([
    prisma.restaurantSettings.findUnique({where:{id:"default"}}),
    prisma.category.findMany({
      where:{active:true},
      orderBy:{order:"asc"},
      include:{products:{orderBy:[{featured:"desc"},{name:"asc"}]}}
    })
  ]);
  const settings={restaurantName:storedSettings?.restaurantName??"Jantinha do Rogério",description:storedSettings?.description??"",whatsapp:storedSettings?.whatsapp??"",instagram:storedSettings?.instagram??"",address:storedSettings?.address??"",openingHours:storedSettings?.openingHours??""};
  const menuCategories:MenuCategory[]=categories.map(category=>({id:category.id,name:category.name,slug:category.slug,products:category.products.map(product=>({...product,categoryName:category.name}))}));
  return <div><header className="menu-hero"><div className="site-container relative z-10 flex min-h-[240px] flex-col items-center justify-center py-10 text-center sm:min-h-[300px]"><Brand/><p className="eyebrow mt-7">Cardápio digital</p><h1 className="display-font mt-3 text-4xl font-bold uppercase sm:text-6xl">{settings.restaurantName}</h1>{settings.description&&<p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">{settings.description}</p>}<div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-[var(--text-secondary)]">{settings.openingHours&&<span className="flex items-center gap-1.5"><Clock3 size={14}/>{settings.openingHours}</span>}{settings.address&&<span className="flex items-center gap-1.5"><MapPin size={14}/>{settings.address}</span>}{settings.instagram&&<span className="flex items-center gap-1.5"><Instagram size={14}/>{settings.instagram}</span>}</div></div></header><MenuExperience categories={menuCategories} settings={settings}/></div>
}
