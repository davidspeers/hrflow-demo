import {
  resetCategoryFilters,
  selectCategoryFilters,
} from "@stores/search/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import DemoToolbarCategoryFilterBadge from "./DemoToolbarCategoryFilterBadge";
import DemoToolbarCategoryFilterDropdown from "./DemoToolbarCategoryFilterDropdown";
import DemoToolbarSearchBar from "./DemoToolbarSearchBar";
import DemoToolbarSortDropdown from "./DemoToolbarSortDropdown";

function DemoToolbar() {
  const dispatch = useDispatch();

  const categoryFilters = useSelector(selectCategoryFilters);
  const isAnyCategoryFilterApplied = categoryFilters.length > 0;

  return (
    <div className="my-4 flex flex-col flex-wrap items-start justify-between md:flex-row">
      <DemoToolbarSearchBar />
      <div className="my-2 flex flex-grow flex-col items-start">
        <div className="flex w-full min-w-48 items-end justify-start md:justify-center">
          <DemoToolbarCategoryFilterDropdown />
          {isAnyCategoryFilterApplied && (
            <button
              onClick={() => dispatch(resetCategoryFilters())}
              className="ml-2 font-semibold text-blue-800 hover:text-blue-600"
            >
              Reset Filters
            </button>
          )}
        </div>
        {isAnyCategoryFilterApplied && (
          <div className="mt-2 flex max-w-96 flex-wrap justify-start md:justify-center">
            {categoryFilters.map((category) => (
              <DemoToolbarCategoryFilterBadge
                key={category}
                category={category}
              />
            ))}
          </div>
        )}
      </div>
      <DemoToolbarSortDropdown />
    </div>
  );
}

export default DemoToolbar;
