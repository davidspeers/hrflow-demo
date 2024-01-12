import { fetchJobResults } from "@stores/search/searchSlice";
import RequestStatus from "@types/RequestStatus";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DemoSearchResults from "./DemoSearchResults";
import DemoTooltip from "./DemoTooltip/DemoTooltip";

function Demo() {
  const dispatch = useDispatch();

  const searchStatus = useSelector((state) => state.search.status);

  useEffect(() => {
    if (searchStatus === RequestStatus.IDLE) {
      dispatch(fetchJobResults());
    }
  }, [dispatch, searchStatus]);

  return (
    <div
      id="page-container"
      className="flex w-full min-w-[320px] flex-grow flex-col bg-gray-50"
    >
      <main
        id="page-content"
        className="flex max-w-full flex-auto flex-col overflow-hidden px-8 text-center xl:max-w-7xl"
      >
        <DemoTooltip />

        {searchStatus === RequestStatus.FAILED ? (
          <div>Something went wrong...</div>
        ) : (
          <DemoSearchResults />
        )}
      </main>
    </div>
  );
}

export default Demo;
