const getCategoryFromJob = (job) => {
  const categoryTag = job.tags.find((tag) => tag.name === "category");
  return categoryTag?.value || "N/A";
};

export default getCategoryFromJob;
