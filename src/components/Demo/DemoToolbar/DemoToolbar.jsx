import DemoToolbarSearchBar from "./DemoToolbarSearchBar";
import DemoToolbarSortDropdown from "./DemoToolbarSortDropdown";

function DemoToolbar() {
  return (
    <div className="flex items-center">
      <DemoToolbarSearchBar />
      <DemoToolbarSortDropdown />
    </div>
  );
}

export default DemoToolbar;
