"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryDropdownProps {
  categories: { name: string }[];
}

const CategoryDropdown = ({ categories }: CategoryDropdownProps) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    router.push(`/blogs/search?category=${category}`);
  };

  return (
    <div className="flex w-full flex-col gap-4 sm:flex-row justify-between mb-6">
      <h1 className="text-3xl font-bold">Search</h1>
      <div className="flex items-center gap-2">
        <label className="flex text-lg font-medium">Filter:</label>
        <Select
          onValueChange={handleCategoryChange}
          defaultValue={selectedCategory}
        >
          <SelectTrigger className="w-full h-[36px] md:h-[48px] min-w-[160px] px-3 py-1 border border-foreground rounded-md shadow-sm focus:outline-none sm:text-sm focus:ring-foreground focus:border-foreground  bg-form text-foreground">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a category</SelectLabel>
              {categories.map((v) => (
                <SelectItem key={v.name} value={v.name}>
                  {v.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CategoryDropdown;
