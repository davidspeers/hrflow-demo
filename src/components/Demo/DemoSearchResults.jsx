import RequestStatus from "@types/RequestStatus";
import SortButtonStatus from "@types/sortButtonStatus";
import { useSelector } from "react-redux";
import { selectAllJobsByTerm } from "../../stores/search/searchSlice";
import DemoLoadingSearchResultItem from "./DemoLoadingSearchResultItem";
import DemoSearchResultItem from "./DemoSearchResultItem";
import DemoSearchResultsSortButton from "./DemoSearchResultsSortButton";

function DemoSearchResults() {
  const searchStatus = useSelector((state) => state.search.status);
  const jobs = useSelector(selectAllJobsByTerm);

  return (
    <div className="min-w-full overflow-x-auto rounded border border-gray-200 bg-white">
      <table className="min-w-full whitespace-nowrap align-middle text-sm">
        <thead>
          <tr>
            <th className="group bg-gray-100/75 px-3 py-4 text-left font-semibold text-gray-900">
              <div className="inline-flex items-center gap-2">
                <span>Name</span>
                <DemoSearchResultsSortButton
                  sortStatus={SortButtonStatus.NOT_SORTED}
                />
              </div>
            </th>
            <th className="group bg-gray-100/75 px-3 py-4 text-center font-semibold text-gray-900">
              <div className="inline-flex items-center gap-2">
                <span>Category</span>
                <DemoSearchResultsSortButton
                  sortStatus={SortButtonStatus.NOT_SORTED}
                />
              </div>
            </th>
            <th className="group bg-gray-100/75 px-3 py-4 text-end font-semibold text-gray-900">
              <div className="inline-flex items-center gap-2">
                <span>Creation Date</span>
                <DemoSearchResultsSortButton
                  sortStatus={SortButtonStatus.NOT_SORTED}
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {searchStatus === RequestStatus.LOADING
            ? Array.from({ length: 10 }).map((_, i) => (
                <DemoLoadingSearchResultItem key={i} />
              ))
            : jobs.map(({ id, name, tags, created_at }) => {
                const categoryTag = tags.find((tag) => tag.name === "category");
                const category = categoryTag ? categoryTag.value : "N/A";
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
