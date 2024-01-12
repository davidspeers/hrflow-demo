import getCategoryFromJob from "@helpers/getCategoryFromJob";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-API-KEY": import.meta.env.VITE_X_API_KEY,
    "X-USER-EMAIL": import.meta.env.VITE_USER_EMAIL,
  },
};

const mapBackendJobsObjectToFrontendJobsObject = (job) => ({
  id: job.id,
  name: job.name,
  creationDate: job.created_at,
  category: getCategoryFromJob(job),
  location: job.location.text,
  skills: job.skills.map((skill) => skill.name),
  company: job.tags.find((tag) => tag.name === "company")?.value || "N/A",
  type: job.tags.find((tag) => tag.name === "type")?.value || "N/A",
  summary: job.summary,
  startDate: job.ranges_date[0]?.value_min,
});

const client = {
  getJobsFromBoard: async function (page) {
    const boardKey = import.meta.env.VITE_BOARD_KEY;
    const response = await fetch(
      `https://api.hrflow.ai/v1/jobs/searching?
          board_keys=["${boardKey}"]&
          page=${page}&
          limit=10&
          order_by=desc&
          `,
      options,
    );
    if (response.status === 200) {
      const {
        data: { jobs },
        meta,
      } = await response.json();
      return {
        jobs: jobs.map((job) => mapBackendJobsObjectToFrontendJobsObject(job)),
        meta,
      };
    } else {
      throw new Error(response.status);
    }
  },
};

export default client;
