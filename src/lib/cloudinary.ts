import "server-only";
import {v2 as cloudinary} from "cloudinary";
export function getCloudinary(){const cloudName=process.env.CLOUDINARY_CLOUD_NAME?.trim(),apiKey=process.env.CLOUDINARY_API_KEY?.trim(),apiSecret=process.env.CLOUDINARY_API_SECRET?.trim();if(!cloudName||!apiKey||!apiSecret)throw new Error("Cloudinary configuration is required for image uploads.");cloudinary.config({cloud_name:cloudName,api_key:apiKey,api_secret:apiSecret,secure:true});return cloudinary}
