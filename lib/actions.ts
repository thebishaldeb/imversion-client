"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const revalidate = (id: number, isRedirect = false) => {
  revalidatePath("/blogs");
  revalidatePath("/blogs/search");
  if (isRedirect) {
    revalidatePath(`/blogs/${id}`);
    redirect("/blogs");
  }
};
