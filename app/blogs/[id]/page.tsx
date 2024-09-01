import Markdown from "@/components/custom/Markdown";
import { BlogPost } from "@/lib/graphql/generated/graphql";
import { gql, client } from "@/lib/client";
import Image from "next/image";
import DeleteButton from "@/components/custom/DeleteButton";

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

const fetchBlogPostById = async (id: number): Promise<BlogPost | null> => {
  try {
    const { blogPost }: { blogPost: BlogPost } = await client.request(query, {
      id,
    });
    return blogPost;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  const blog: BlogPost | null = await fetchBlogPostById(id);

  if (!blog) {
    return (
      <div className="container mx-auto p-6 justify-center text-xl text-accent h-[200px] items-center flex bg-form">
        Blog Not Found
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 mb-5 bg-form">
      <div className="w-full flex justify-between">
        <span className="text-base md:text-lg rounded-tr-full rounded-br-full bg-accent px-4 py-2 text-primary">
          {blog.category}
        </span>
        <DeleteButton id={id} />
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
