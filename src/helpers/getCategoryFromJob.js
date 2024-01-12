import JobCategory from "@types/JobCategory";

const getCategoryFromJob = (job) => {
  const categoryTag = job.tags.find((tag) => tag.name === "category");
  let category = categoryTag?.value || "N/A";
  if (category.toLowerCase() === "Humain Resources".toLowerCase()) {
    category = JobCategory.HR;
  }
  return category;
};

export default getCategoryFromJob;
