import CategoryDropdown from "@/components/CategoryDropdown";
import BlogsList from "@/components/CategoriesBlogsList";
import { CATEGORIES } from "@/constants";

// Page component
export default function BlogsSearchPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <CategoryDropdown categories={CATEGORIES} />
      <BlogsList />
    </div>
  );
}
