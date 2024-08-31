import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BlogPost {
  id: number;
  category: string;
  featureImage: string;
  excerpt: string;
}

interface BlogsListProps {
  blogs: {
    totalCount: number;
    edges: BlogPost[];
    pageInfo: {
      endCursor: number;
      hasNextPage: boolean;
    };
  };
  limit: number;
  offset: number;
}

const BlogsList = ({ blogs, limit, offset }: BlogsListProps) => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.edges.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            {blog.featureImage && blog.featureImage.startsWith("http") && (
              <Image
                src={blog.featureImage}
                alt={blog.category}
                className="w-full h-48 object-cover"
                height={48}
                width={100}
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
            href={`/blogs?limit=${limit}&offset=${offset - limit}`}
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
            href={`/blogs?limit=${limit}&offset=${offset + limit}`}
            className="text-blue-500 hover:text-blue-700"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogsList;
