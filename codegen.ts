import type { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";

dotenv.config();

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_SCHEMA,
  documents: ["(app|components)/**/*.tsx"],
  debug: true,
  verbose: true,
  ignoreNoDocuments: true,
  watch: true,
  generates: {
    "lib/graphql/generated/graphql.tsx": {
      plugins: ["typescript", "typescript-operations"],
    },
  },
};

export default config;
