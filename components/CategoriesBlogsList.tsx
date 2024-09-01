"use client";

import { useEffect, useState } from "react";
import { gql, client } from "@/lib/client";
import { BlogsList, BlogPost } from "@/lib/graphql/generated/graphql";
import { useSearchParams } from "next/navigation";
import BlogCard from "./custom/BlogCard";
import { PaginationComponent } from "./custom/Pagination";

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

  if (!blogs?.edges?.length)
    return (
      <div className="justify-center text-xl text-accent h-[200px] items-center flex">
        {category ? "No blog posts found." : "Please select a category"}
      </div>
    );

  return (
    <>
      <div className="flex justify-center flex-wrap gap-6 lg:gap-8">
        {blogs.edges.map((blog: BlogPost, key: number) => (
          <BlogCard key={key} blog={blog} />
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <PaginationComponent
          className={"mx-auto flex w-full justify-center"}
          offset={offset}
          limit={limit}
          totalCount={blogs.totalCount}
          hasNextPage={blogs.pageInfo.hasNextPage}
          url={`/blogs/search?category=${category}&`}
        />
      </div>
    </>
  );
};

export default CategoriesBlogsList;
