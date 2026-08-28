import {randomUUID} from "node:crypto";
import {mkdir,writeFile} from "node:fs/promises";
import path from "node:path";
import {cloudinary} from "@/lib/cloudinary";
const allowed:Record<string,string>={"image/jpeg":"jpg","image/png":"png","image/webp":"webp","image/gif":"gif"};
export async function saveProductImage(file:File){const extension=allowed[file.type];if(!extension)throw new Error("Formato de imagem inválido.");if(file.size>5*1024*1024)throw new Error("A imagem deve ter no máximo 5 MB.");const buffer=Buffer.from(await file.arrayBuffer());const configured=Boolean(process.env.CLOUDINARY_CLOUD_NAME&&process.env.CLOUDINARY_API_KEY&&process.env.CLOUDINARY_API_SECRET);if(configured)return new Promise<string>((resolve,reject)=>cloudinary.uploader.upload_stream({folder:"jantinha",resource_type:"image"},(error,result)=>error?reject(error):resolve(result!.secure_url)).end(buffer));const filename=`${randomUUID()}.${extension}`;const directory=path.join(process.cwd(),"public","uploads");await mkdir(directory,{recursive:true});await writeFile(path.join(directory,filename),buffer);return `/uploads/${filename}`}
