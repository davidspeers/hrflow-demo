import { SearchIcon } from "@icons";
import { selectSearchTerm, updateTerm } from "@stores/search/searchSlice";
import { useDispatch, useSelector } from "react-redux";

function DemoToolbarSearchBar() {
  const dispatch = useDispatch();

  const searchTerm = useSelector(selectSearchTerm);

  const handleChange = (event) => {
    dispatch(updateTerm(event.target.value));
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 my-px ml-px flex w-12 items-center justify-center rounded-l-lg text-gray-500">
        <SearchIcon />
      </div>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search.."
        className="block w-full rounded-lg border border-gray-200 pl-12 pr-5 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default DemoToolbarSearchBar;
