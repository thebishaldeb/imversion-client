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
    <div className="container mx-auto p-6 mb-5 bg-form">
      <div className="w-full flex justify-start">
        <span className="text-base md:text-lg rounded-tr-full rounded-br-full bg-accent px-4 py-2 text-primary">
          {blog.category}
        </span>
      </div>
      <h2 className="h2 my-4">{blog.excerpt}</h2>
      {blog.featureImage && blog.featureImage.startsWith("http") && (
        <Image
          src={blog.featureImage}
          alt={blog.category}
          className="mb-4 w-full h-auto"
          quality={100}
          width={768}
          height={768}
        />
      )}
      <div className="border-t-accent/50 border-t-2 pt-8 mt-8 html-wrap">
        <div className="custom-html-style">
          <Markdown>{blog.mainContent}</Markdown>
        </div>
      </div>
    </div>
  );
}
