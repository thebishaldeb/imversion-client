"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { gql, client } from "@/lib/client";
import {
  BlogPost,
  CreateBlogPostMutationVariables,
} from "@/lib/graphql/generated/graphql";
import "react-markdown-editor-lite/lib/index.css";
import Markdown from "@/components/custom/Markdown";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/constants";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

const mutation = gql`
  mutation CreateBlogPost(
    $featureImage: String!
    $mainContent: String!
    $excerpt: String!
    $category: String!
  ) {
    createBlogPost(
      featureImage: $featureImage
      mainContent: $mainContent
      excerpt: $excerpt
      category: $category
    ) {
      id
      category
      featureImage
      excerpt
      mainContent
    }
  }
`;

const saveBlogPost = async (
  blogPost: CreateBlogPostMutationVariables
): Promise<BlogPost> => {
  const { createBlogPost }: { createBlogPost: BlogPost } = await client.request(
    mutation,
    blogPost
  );

  return createBlogPost;
};

const FormSchema = z.object({
  category: z.string(),
  excerpt: z.string(),
  featureImage: z.string().url(),
  mainContent: z.string(),
});

export default function BlogFormPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const router = useRouter();

  const [load, setLoad] = useState(false);

  const handleSave = async (data: z.infer<typeof FormSchema>) => {
    setLoad(true);
    const blogPost: CreateBlogPostMutationVariables = data;
    const response = await saveBlogPost(blogPost);

    router.push(`/blogs/${response.id}`);
    setLoad(false);
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-md rounded-lg bg-foreground/10">
      <h1 className="text-2xl font-semibold mb-6">Create New Blog</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)}>
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="block text-sm font-medium">
                  Category
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="mt-1 w-full px-3 py-2 border border-foreground rounded-md shadow-sm focus:outline-none sm:text-sm focus:ring-foreground focus:border-foreground  bg-form text-foreground">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select a category</SelectLabel>
                      {CATEGORIES.map((v) => (
                        <SelectItem key={v.name} value={v.name}>
                          {v.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="block text-sm font-medium">
                  Excerpt
                </FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Excerpt" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="featureImage"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="block text-sm font-medium">
                  Feature Image URL
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder=" Feature Image URL" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mainContent"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="block text-sm font-medium">
                  Main Content
                </FormLabel>
                <FormControl>
                  <MdEditor
                    value={field.value}
                    style={{ height: "500px" }}
                    renderHTML={(text) => <Markdown>{text}</Markdown>}
                    onChange={({ text }) => field.onChange(text)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size={"md"}
            disabled={load}
            className="w-full inline-flex justify-center hover:bg-accent-hover disabled:bg-foreground/50"
          >
            Create Blog
          </Button>
        </form>
      </Form>
    </div>
  );
}
