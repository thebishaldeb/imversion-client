import { gql, client } from "@/lib/client";
import BlogsList from "@/components/BlogsList";
import {
  BlogsList as Blogs,
  GetBlogPostsQueryVariables,
} from "@/lib/graphql/generated/graphql";

const query = gql`
  query GetBlogPosts($limit: Int!, $offset: Int!) {
    blogPosts(limit: $limit, offset: $offset) {
      totalCount
      edges {
        id
        featureImage
        excerpt
        category
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

const fetchBlogPosts = async (
  limit: number,
  offset: number
): Promise<Blogs> => {
  const variables: GetBlogPostsQueryVariables = { limit, offset };

  const {
    blogPosts,
  }: {
    blogPosts: Blogs;
  } = await client.request(query, variables);

  return blogPosts;
};

interface BlogsPageProps {
  searchParams: {
    limit?: string;
    offset?: string;
  };
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const limit = parseInt(searchParams.limit || "6");
  const offset = parseInt(searchParams.offset || "0");

  const blogs: Blogs = await fetchBlogPosts(limit, offset);

  return <BlogsList blogs={blogs} limit={limit} offset={offset} />;
}
