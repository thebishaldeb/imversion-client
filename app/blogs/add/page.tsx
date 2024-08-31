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
import Markdown from "@/components/Markdown";

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

export const saveBlogPost = async (
  blogPost: CreateBlogPostMutationVariables
): Promise<BlogPost> => {
  const { createBlogPost }: { createBlogPost: BlogPost } = await client.request(
    mutation,
    blogPost
  );

  return createBlogPost;
};

export default function BlogFormPage() {
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [featureImage, setFeatureImage] = useState("");
  const [mainContent, setMainContent] = useState("");
  const router = useRouter();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const blogPost: CreateBlogPostMutationVariables = {
      category,
      excerpt,
      featureImage,
      mainContent,
    };

    const response = await saveBlogPost(blogPost);

    router.push(`/blogs/${response.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Create New Blog Post</h1>
      <form onSubmit={handleSave}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Excerpt
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Feature Image URL
          </label>
          <input
            type="text"
            value={featureImage}
            onChange={(e) => setFeatureImage(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Main Content
          </label>
          <MdEditor
            value={mainContent}
            style={{ height: "500px" }}
            // renderHTML={(text) => mdParser.render(text)}
            renderHTML={(text) => <Markdown>{text}</Markdown>}
            onChange={({ text }) => setMainContent(text)}
          />
        </div>
        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
