import {redirect} from "next/navigation";
import {prisma} from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {ProductForm} from "@/components/admin/product-form";
import {saveProductImage} from "@/lib/product-image";
import {guard} from "@/lib/auth";

async function save(formData:FormData){
  "use server";
  await guard();
  const file=formData.get("image") as File;
  const name=String(formData.get("name")??"").trim();
  const priceCents=Math.round(Number(String(formData.get("price")??"").replace(",","."))*100);
  if(!name||!Number.isFinite(priceCents)||priceCents<1||!file?.size)return;
  let categoryId=String(formData.get("categoryId")??"");
  if(!categoryId){
    const general=await prisma.category.upsert({where:{slug:"geral"},update:{active:true},create:{name:"Geral",slug:"geral",active:true}});
    categoryId=general.id;
  }
  const imageUrl=await saveProductImage(file);
  await prisma.product.create({data:{name,description:String(formData.get("description")??"").trim(),priceCents,imageUrl,categoryId,available:formData.get("available")==="on",featured:formData.get("featured")==="on"}});
  revalidatePath("/");redirect("/admin/produtos");
}

export default async function Page(){
  const categories=await prisma.category.findMany({where:{active:true},orderBy:{order:"asc"}});
  return <main className="admin-container admin-page"><ProductForm action={save} categories={categories}/></main>;
}
