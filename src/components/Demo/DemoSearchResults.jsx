import getCategoryFromJob from "@helpers/getCategoryFromJob";
import { selectAllJobsByTermAndSorted } from "@stores/search/searchSlice";
import RequestStatus from "@types/RequestStatus";
import { useSelector } from "react-redux";
import DemoLoadingSearchResultItem from "./DemoLoadingSearchResultItem";
import DemoSearchResultItem from "./DemoSearchResultItem";

function DemoSearchResults() {
  const searchStatus = useSelector((state) => state.search.status);
  const jobs = useSelector(selectAllJobsByTermAndSorted);

  return (
    <div className="min-w-full overflow-x-auto rounded border border-gray-200 bg-white">
      <table className="min-w-full whitespace-nowrap align-middle text-sm">
        <thead>
          <tr>
            <th className="group bg-gray-100/75 px-3 py-4 text-left font-semibold text-gray-900">
              <div className="inline-flex items-center gap-2">
                <span>Name</span>
              </div>
            </th>
            <th className="group bg-gray-100/75 px-3 py-4 text-center font-semibold text-gray-900">
              <div className="inline-flex items-center gap-2">
                <span>Category</span>
              </div>
            </th>
            <th className="group bg-gray-100/75 px-3 py-4 text-end font-semibold text-gray-900">
              <div className="inline-flex items-center gap-2">
                <span>Creation Date</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {searchStatus === RequestStatus.LOADING
            ? Array.from({ length: 10 }).map((_, i) => (
                <DemoLoadingSearchResultItem key={i} />
              ))
            : jobs.map((job) => {
                const { id, name, created_at } = job;
                const category = getCategoryFromJob(job);
                return (
                  <DemoSearchResultItem
                    key={id}
                    name={name}
                    category={category}
                    creationDate={created_at}
                  />
                );
              })}
        </tbody>
      </table>
    </div>
  );
}

export default DemoSearchResults;
