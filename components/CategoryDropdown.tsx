"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CategoryDropdownProps {
  categories: { name: string }[];
}

const CategoryDropdown = ({ categories }: CategoryDropdownProps) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value;
    setSelectedCategory(category);
    router.push(`/blogs/search?category=${category}`);
  };

  return (
    <div className="mb-6">
      <label htmlFor="category" className="block text-lg font-medium mb-2">
        Filter by Category:
      </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="border border-gray-300 rounded-lg p-2"
      >
        <option value="">Select a category</option>
        {categories.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
