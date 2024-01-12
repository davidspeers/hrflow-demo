import JobCategory from "@types/JobCategory";

export function getCategoryColor(category) {
  const categoryColors = {
    [JobCategory.AI_AND_RND]: "bg-teal-200 text-teal-700",
    [JobCategory.AI]: "bg-blue-200 text-blue-700",
    [JobCategory.FINANCE]: "bg-emerald-100 text-emerald-900",
    [JobCategory.HR]: "bg-purple-200 text-purple-700",
    [JobCategory.SWE]: "bg-yellow-300 text-yellow-800",
  };
  const matchingColor = Object.keys(categoryColors).find(
    (key) => key.toLowerCase() === category.toLowerCase(),
  );

  return categoryColors[matchingColor] || "bg-gray-100 text-gray-600";
}
