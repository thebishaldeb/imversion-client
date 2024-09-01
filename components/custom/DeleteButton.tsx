"use client";

import { Button } from "../ui/button";
import { gql, client } from "@/lib/client";
import { revalidate } from "@/lib/actions";

const mutation = gql`
  mutation DeleteBlog($deleteBlogPostId: Int!) {
    deleteBlogPost(id: $deleteBlogPostId)
  }
`;

const deleteBlog = async (id: number): Promise<boolean> => {
  try {
    const { deleteBlogPost }: { deleteBlogPost: boolean } =
      await client.request(mutation, { deleteBlogPostId: id });
    return deleteBlogPost;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const DeleteButton = ({ id }: { id: number }) => {
  return (
    <Button
      variant="primary"
      size="sm"
      className="bg-[#ff0000] rounded-none text-primary"
      onClick={async () => {
        const res = await deleteBlog(id);
        if (res) revalidate(id, true);
        else alert("Could not delete the blog!");
      }}
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
