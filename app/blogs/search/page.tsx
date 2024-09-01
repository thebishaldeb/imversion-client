import CategoryDropdown from "@/components/CategoryDropdown";
import BlogsList from "@/components/CategoriesBlogsList";
import { CATEGORIES } from "@/constants";

// Page component
export default function BlogsSearchPage() {
  return (
    <div className="container mx-auto p-6 bg-form">
      <CategoryDropdown categories={CATEGORIES} />
      <BlogsList />
    </div>
  );
}
