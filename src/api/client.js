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
});

const client = {
  getJobsFromBoard: async function (page) {
    const boardKey = import.meta.env.VITE_BOARD_KEY;
    try {
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
        return jobs.map((job) => mapBackendJobsObjectToFrontendJobsObject(job));
        return {
          jobs: jobs.map((job) =>
            mapBackendJobsObjectToFrontendJobsObject(job),
          ),
          meta,
        };
      } else {
        throw new Error(response.status);
      }
    } catch (e) {
      console.error(e);
    }
  },
};

export default client;
