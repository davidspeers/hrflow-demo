const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-API-KEY": import.meta.env.VITE_X_API_KEY,
    "X-USER-EMAIL": import.meta.env.VITE_USER_EMAIL,
  },
};

const client = {
  getJobsFromBoard: async function () {
    const boardKey = import.meta.env.VITE_BOARD_KEY;
    try {
      const response = await fetch(
        `https://api.hrflow.ai/v1/jobs/searching?
          board_keys=["${boardKey}"]&
          page=1&
          limit=20&
          order_by=desc&
          `,
        options,
      );
      if (response.status === 200) {
        const {
          data: { jobs },
        } = await response.json();
        return jobs;
      } else {
        throw new Error(response.status);
      }
    } catch (e) {
      console.error(e);
    }
  },
};

export default client;
