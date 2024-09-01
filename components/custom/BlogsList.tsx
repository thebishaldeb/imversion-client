import { BlogsList as Blogs } from "@/lib/graphql/generated/graphql";
import React from "react";
import BlogCard from "./BlogCard";
import { PaginationComponent } from "./Pagination";

interface BlogsListProps {
  blogs: Blogs;
  limit: number;
  offset: number;
}

const BlogsList = ({ blogs, limit, offset }: BlogsListProps) => {
  return (
    <div className="container mx-auto p-6 bg-form">
      <div className="flex w-full justify-between mb-6">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <PaginationComponent
          offset={offset}
          limit={limit}
          totalCount={blogs.totalCount}
          hasNextPage={blogs.pageInfo.hasNextPage}
          className="hidden md:flex"
          url="/blogs?"
        />
      </div>
      <div className="flex justify-center flex-wrap gap-6 lg:gap-8">
        {blogs.edges.map((blog, key) => (
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
          url="/blogs?"
        />
      </div>
    </div>
  );
};

export default BlogsList;
