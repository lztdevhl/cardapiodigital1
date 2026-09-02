import {notFound,redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {ProductForm} from "@/components/admin/product-form";
import {prisma} from "@/lib/prisma";
import {saveProductImage} from "@/lib/product-image";
import {guard} from "@/lib/auth";

export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;const [product,categories]=await Promise.all([prisma.product.findUnique({where:{id}}),prisma.category.findMany({where:{active:true},orderBy:{order:"asc"}})]);if(!product)notFound();const currentImageUrl=product.imageUrl;async function update(formData:FormData){"use server";await guard();const file=formData.get("image") as File;const name=String(formData.get("name")??"").trim();const priceCents=Math.round(Number(String(formData.get("price")??"").replace(",","."))*100);if(!name||!Number.isFinite(priceCents)||priceCents<1)return;const imageUrl=file?.size?await saveProductImage(file):currentImageUrl;await prisma.product.update({where:{id},data:{name,description:String(formData.get("description")??"").trim(),priceCents,imageUrl,categoryId:String(formData.get("categoryId")),available:formData.get("available")==="on",featured:formData.get("featured")==="on"}});revalidatePath("/");revalidatePath("/admin/produtos");redirect("/admin/produtos")};return <main className="admin-container admin-page"><ProductForm action={update} categories={categories} product={product}/></main>}
