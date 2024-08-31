export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type BlogPost = {
  __typename?: 'BlogPost';
  category: Scalars['String']['output'];
  excerpt: Scalars['String']['output'];
  featureImage: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  mainContent: Scalars['String']['output'];
};

export type BlogsList = {
  __typename?: 'BlogsList';
  /** List of blogs retrieved by the query. */
  edges: Array<BlogPost>;
  /** 'pageInfo' specifies if further queries would provide more blogs. */
  pageInfo: PageInfo;
  /** Total no of blogs */
  totalCount: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBlogPost: BlogPost;
  deleteBlogPost?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationCreateBlogPostArgs = {
  category: Scalars['String']['input'];
  excerpt: Scalars['String']['input'];
  featureImage: Scalars['String']['input'];
  mainContent: Scalars['String']['input'];
};


export type MutationDeleteBlogPostArgs = {
  id: Scalars['Int']['input'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  /** 'endCursor' suggests the doc no of the last doc retrieved. */
  endCursor: Scalars['Int']['output'];
  /** 'hasNextPage' specifies if there are more docs to retrieve. */
  hasNextPage: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  blogPost?: Maybe<BlogPost>;
  blogPosts: BlogsList;
  blogPostsByCategory: BlogsList;
};


export type QueryBlogPostArgs = {
  id: Scalars['Int']['input'];
};


export type QueryBlogPostsArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};


export type QueryBlogPostsByCategoryArgs = {
  category: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};

export type GetBlogPostQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetBlogPostQuery = { __typename?: 'Query', blogPost?: { __typename?: 'BlogPost', id: number, featureImage: string, excerpt: string, category: string, mainContent: string } | null };

export type CreateBlogPostMutationVariables = Exact<{
  featureImage: Scalars['String']['input'];
  mainContent: Scalars['String']['input'];
  excerpt: Scalars['String']['input'];
  category: Scalars['String']['input'];
}>;


export type CreateBlogPostMutation = { __typename?: 'Mutation', createBlogPost: { __typename?: 'BlogPost', id: number, category: string, featureImage: string, excerpt: string, mainContent: string } };

export type GetBlogPostsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type GetBlogPostsQuery = { __typename?: 'Query', blogPosts: { __typename?: 'BlogsList', totalCount: number, edges: Array<{ __typename?: 'BlogPost', id: number, featureImage: string, excerpt: string, category: string }>, pageInfo: { __typename?: 'PageInfo', endCursor: number, hasNextPage: boolean } } };

export type GetBlogPostsByCategoryQueryVariables = Exact<{
  category: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type GetBlogPostsByCategoryQuery = { __typename?: 'Query', blogPostsByCategory: { __typename?: 'BlogsList', totalCount: number, edges: Array<{ __typename?: 'BlogPost', id: number, category: string, featureImage: string, excerpt: string }>, pageInfo: { __typename?: 'PageInfo', endCursor: number, hasNextPage: boolean } } };
