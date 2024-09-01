"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { gql, client } from "@/lib/client";

const mutation = gql`
  mutation DeleteBlog($deleteBlogPostId: Int!) {
    deleteBlogPost(id: $deleteBlogPostId)
  }
`;

const deleteBlog = async (id: number): Promise<boolean> => {
  const { deleteBlogPost }: { deleteBlogPost: boolean } = await client.request(
    mutation,
    { deleteBlogPostId: id }
  );

  return deleteBlogPost;
};

const DeleteButton = ({ id }: { id: number }) => {
  const router = useRouter();
  return (
    <Button
      variant="primary"
      size="sm"
      className="bg-[#ff0000] rounded-none text-primary"
      onClick={async () => {
        const res = await deleteBlog(id);
        if (res) {
          router.replace("/blogs");
        }
      }}
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
