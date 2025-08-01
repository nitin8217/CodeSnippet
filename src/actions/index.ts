"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
export const saveSnippet = async (id:number,code:string) =>
{
  await prisma.snippet.update({
    where: { 
        id,
     },
    data: { 
        code },
  });
  revalidatePath(`/snippet/${id}`);
  redirect(`/snippet/${id}`);
}

export const deleteSnippet = async (id:number) =>
{
  await prisma.snippet.delete({
    where: { 
        id,
     },
  });
  revalidatePath("/");
  redirect("/");
}
export async function createSnippet(prevState:{message:string},formData:FormData){
  try {
    const title = formData.get("title");
        const code = formData.get("code");
         if(!title || typeof title !== "string"){
          return{message:"Title is required"}
         }
        if(!code || typeof code!== "string"){
          return{message:"Code is required"}
        }
        await prisma.snippet.create({
            data:{
                title,
                code
            }
        });
        
       // throw new Error("Oops! Something went wrong. Please try again later.");
       revalidatePath("/");
  } catch (error:unknown) {
    if (error instanceof Error) {
      console.error("Error creating snippet:", error.message);
    return {message:error.message}
    }
  else{
    console.error("An unexpected error occurred:", error);
  }}

    redirect("/");
  }
