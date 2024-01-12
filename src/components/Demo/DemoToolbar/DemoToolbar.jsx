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
    <div className="mb-2 mt-2 flex flex-wrap items-start justify-between">
      <DemoToolbarSearchBar />
      <div className="flex flex-col items-center">
        <div className="flex items-end">
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
          <div className="mt-2 flex max-w-96 flex-wrap justify-end">
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
