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
    <main
      id="page-content"
      className="flex flex-col items-center overflow-hidden bg-gray-50 px-4 text-center md:px-8"
    >
      {searchStatus === RequestStatus.FAILED ? (
        <div className="p-8 font-semibold text-rose-400">{errorMessage}</div>
      ) : (
        <div className="w-full lg:max-w-7xl">
          <DemoToolbar />
          <DemoSearchResults />
          <DemoPagination />
        </div>
      )}
    </main>
  );
}

export default Demo;
