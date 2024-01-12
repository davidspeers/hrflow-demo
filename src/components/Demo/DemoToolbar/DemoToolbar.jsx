import { selectCategoryFilters } from "@stores/search/searchSlice";
import { useSelector } from "react-redux";
import DemoToolbarCategoryFilterBadge from "./DemoToolbarCategoryFilterBadge";
import DemoToolbarCategoryFilterDropdown from "./DemoToolbarCategoryFilterDropdown";
import DemoToolbarSearchBar from "./DemoToolbarSearchBar";
import DemoToolbarSortDropdown from "./DemoToolbarSortDropdown";

function DemoToolbar() {
  const categoryFilters = useSelector(selectCategoryFilters);

  return (
    <div className="flex items-center">
      <DemoToolbarSearchBar />
      <div className="flex flex-col items-center">
        <DemoToolbarCategoryFilterDropdown />
        {categoryFilters.map((category) => (
          <DemoToolbarCategoryFilterBadge key={category} category={category} />
        ))}
      </div>
      <DemoToolbarSortDropdown />
    </div>
  );
}

export default DemoToolbar;
