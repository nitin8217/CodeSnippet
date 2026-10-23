"use server"

import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
export const saveSnippet = async (id:number, code:string, title:string) =>
{
  const { error } = await supabase
    .from("Snippet")
    .update({ code, title })
    .eq("id", id);
  if (error) throw new Error(`Unable to update snippet: ${error.message}`);
  revalidatePath(`/snippet/${id}`);
  redirect(`/snippet/${id}`);
}

export const deleteSnippet = async (id:number) =>
{
  const { error } = await supabase.from("Snippet").delete().eq("id", id);
  if (error) throw new Error(`Unable to delete snippet: ${error.message}`);
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
        const { error } = await supabase.from("Snippet").insert({ title, code });
        if (error) throw new Error(`Unable to create snippet: ${error.message}`);
        
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
