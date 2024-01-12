const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-API-KEY": import.meta.env.VITE_X_API_KEY,
    "X-USER-EMAIL": import.meta.env.VITE_USER_EMAIL,
  },
};

const client = {
  getJobsFromBoard: async function (name) {
    const boardKey = import.meta.env.VITE_BOARD_KEY;
    try {
      const response = await fetch(
        `https://api.hrflow.ai/v1/storing/jobs?
          board_keys=["${boardKey}"]&
          name=${name}&
          return_job=true&
          page=1&limit=10&
          order_by=desc&
          sort_by=created_at
          `,
        options,
      );
      if (response.status === 200) {
        const { data } = await response.json();
        return data;
      } else {
        throw new Error(response.status);
      }
    } catch (e) {
      console.error(e);
    }
  },
};

export default client;
