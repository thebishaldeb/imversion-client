"use client";

import { useEffect, useState } from "react";
import { gql, client } from "@/lib/client";
import Link from "next/link";
import { BlogsList } from "@/lib/graphql/generated/graphql";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

// GraphQL query to get blog posts by category
const query = gql`
  query GetBlogPostsByCategory(
    $category: String!
    $limit: Int!
    $offset: Int!
  ) {
    blogPostsByCategory(category: $category, limit: $limit, offset: $offset) {
      totalCount
      edges {
        id
        category
        featureImage
        excerpt
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

interface BlogPost {
  id: number;
  category: string;
  featureImage: string;
  excerpt: string;
}

const CategoriesBlogsList = () => {
  const searchParams = useSearchParams();
  const [blogs, setBlogs] = useState<BlogsList>();
  const [loading, setLoading] = useState(true);

  const category = searchParams.get("category") || "";
  const limit = parseInt(searchParams.get("limit") || "6", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const { blogPostsByCategory }: { blogPostsByCategory: BlogsList } =
        await client.request(query, { category, limit, offset });
      setBlogs(blogPostsByCategory);
      setLoading(false);
    };

    fetchBlogs();
  }, [category, offset, limit]);

  if (loading) return <div>Loading...</div>;

  if (!blogs) return <div>No blog posts found.</div>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.edges.map((blog: BlogPost) => (
          <div
            key={blog.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            {blog.featureImage && (
              <Image
                height={48}
                width={48}
                src={blog.featureImage}
                alt={blog.category}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{blog.category}</h2>
              <p className="text-gray-700 mb-4">{blog.excerpt}</p>
              <Link
                href={`/blogs/${blog.id}`}
                className="text-blue-500 hover:text-blue-700"
              >
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        {offset > 0 && (
          <Link
            href={`/blogs/search?category=${category}&limit=${limit}&offset=${
              offset - limit
            }`}
            className="text-blue-500 hover:text-blue-700"
          >
            Previous
          </Link>
        )}
        <p className="text-gray-700">
          Page {Math.ceil(offset / limit) + 1} of{" "}
          {Math.ceil(blogs.totalCount / limit)}
        </p>
        {blogs.pageInfo.hasNextPage && (
          <Link
            href={`/blogs/search?category=${category}&limit=${limit}&offset=${
              offset + limit
            }`}
            className="text-blue-500 hover:text-blue-700"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
};

export default CategoriesBlogsList;
