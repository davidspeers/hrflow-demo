import {
  fetchJobResults,
  selectErrorMessage,
  selectRequestStatus,
} from "@stores/search/searchSlice";
import RequestStatus from "@types/RequestStatus";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DemoPagination from "./DemoPagination";
import DemoSearchResults from "./DemoSearchResults";
import DemoToolbar from "./DemoToolbar/DemoToolbar";

function Demo() {
  const dispatch = useDispatch();

  const searchStatus = useSelector(selectRequestStatus);
  const errorMessage = useSelector(selectErrorMessage);

  useEffect(() => {
    if (searchStatus === RequestStatus.IDLE) {
      dispatch(fetchJobResults({ page: 1 }));
    }
  }, [dispatch, searchStatus]);

  return (
    <div className="flex w-full flex-grow justify-center bg-gray-50">
      <main
        id="page-content"
        className="flex flex-col overflow-hidden px-4 text-center md:px-8 xl:w-full xl:max-w-7xl"
      >
        {searchStatus === RequestStatus.FAILED ? (
          <div className="p-8 font-semibold text-rose-400">{errorMessage}</div>
        ) : (
          <>
            <DemoToolbar />
            <DemoSearchResults />
            <DemoPagination />
          </>
        )}
      </main>
    </div>
  );
}

export default Demo;
