import { GraphQLClient } from "graphql-request";
export { gql } from "graphql-request";

export const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_SCHEMA as string
);
