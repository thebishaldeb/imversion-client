import Markdown from "@/components/Markdown";
import { BlogPost } from "@/lib/graphql/generated/graphql";
import { request, gql } from "graphql-request";
import Image from "next/image";

const query = gql`
  query GetBlogPost($id: Int!) {
    blogPost(id: $id) {
      id
      featureImage
      excerpt
      category
      mainContent
    }
  }
`;

const fetchBlogPostById = async (id: number): Promise<BlogPost> => {
  const { blogPost }: { blogPost: BlogPost } = await request(
    process.env.NEXT_PUBLIC_SCHEMA as string,
    query,
    { id }
  );

  return blogPost;
};

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  const blog: BlogPost = await fetchBlogPostById(id);

  if (!blog) {
    return <div className="container mx-auto p-6">Blog Post Not Found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{blog.category}</h1>
      <p className="text-lg text-gray-700 mb-4">{blog.excerpt}</p>
      {blog.featureImage && blog.featureImage.startsWith("http") && (
        <Image
          src={blog.featureImage}
          alt={blog.category}
          className="mb-4 max-w-full h-auto"
          quality={100}
          width={400}
          height={400}
        />
      )}
      <Markdown>{blog.mainContent}</Markdown>
    </div>
  );
}
