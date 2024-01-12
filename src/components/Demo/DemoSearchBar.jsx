import { fetchJobResults, updateTerm } from "@stores/search/searchSlice";
import Status from "@types/requestStatus";
import { useDispatch, useSelector } from "react-redux";

function DemoSearchBar() {
  const searchTerm = useSelector((state) => state.search.term);
  const dispatch = useDispatch();

  const searchStatus = useSelector((state) => state.search.status);

  const handleChange = (event) => {
    dispatch(updateTerm(event.target.value));
    if (searchStatus === Status.IDLE) {
      dispatch(fetchJobResults());
    }
  };

  return (
    <div className="mx-auto w-1/2 max-w-md space-y-1 py-4">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 my-px ml-px flex w-12 items-center justify-center rounded-l-lg text-gray-500">
          <svg
            className="hi-mini hi-magnifying-glass inline-block size-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search.."
          className="block w-full rounded-lg border border-gray-200 py-3 pl-12 pr-5 leading-6 placeholder-gray-500 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default DemoSearchBar;
