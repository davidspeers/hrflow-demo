import JobCategory from "@types/JobCategory";

const getCategoryFromJob = (job) => {
  const categoryTag = job.tags.find((tag) => tag.name === "category");
  let category = categoryTag?.value || "N/A";
  if (category.toLowerCase() === JobCategory.HR_alt.toLowerCase()) {
    category = JobCategory.HR;
  }
  return category;
};

export default getCategoryFromJob;
