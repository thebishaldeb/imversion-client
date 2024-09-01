"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BlogPost } from "@/lib/graphql/generated/graphql";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const tags = ["Learning"];

const BlogCard = ({ blog }: { blog: BlogPost }) => {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(`/blogs/${blog.id}`)}
      key={blog.id}
      className="bg-white shadow-sm shadow-accent rounded-lg overflow-hidden w-full max-w-[300px] flex-shrink-0 cursor-pointer hover:shadow-lg hover:shadow-accent-hover"
    >
      {blog.featureImage && blog.featureImage.startsWith("http") && (
        <Image
          src={blog.featureImage}
          alt={blog.category}
          className="w-full h-48 object-cover"
          height={50022}
          width={500}
          quality={100}
        />
      )}
      <div className="w-full flex justify-start mt-4">
        <span className="text-sm rounded-tr-full rounded-br-full bg-accent px-4 py-1 text-primary">
          {blog.category}
        </span>
      </div>
      <CardContent className="p-4">
        <h3 className="h3 leading-6 h-[48px]">
          {blog.excerpt.length > 45
            ? blog.excerpt.substring(0, 45) + "..."
            : blog.excerpt}
        </h3>
        <Link
          href={`/blogs/${blog.id}`}
          className="text-lg text-accent mt-4 hover:text-accent-hover"
        >
          Read more
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
