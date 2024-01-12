import { ChevronLeftIcon, ChevronRightIcon } from "@icons";
import {
  decrementPage as decrementPageAction,
  fetchJobResults,
  incrementPage as incrementPageAction,
  selectMaxPage,
  selectPage,
} from "@stores/search/searchSlice";
import { useDispatch, useSelector } from "react-redux";

export default function PaginationSimple() {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const maxPage = useSelector(selectMaxPage);

  const incrementPage = () => {
    if (page === maxPage) return;
    dispatch(fetchJobResults({ page: page + 1 }));
    dispatch(incrementPageAction());
  };

  const decrementPage = () => {
    if (page === 1) return;
    dispatch(fetchJobResults({ page: page - 1 }));
    dispatch(decrementPageAction());
  };

  return (
    maxPage > 0 && (
      <div className="flex justify-center text-center">
        <button
          onClick={() => decrementPage()}
          className="hover:z-1 focus:z-1 active:z-1 inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-4 py-2 font-semibold leading-6 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none"
        >
          <ChevronLeftIcon />
        </button>
        <div className="flex items-center justify-center px-2 sm:px-4">
          <span>
            Page <span className="font-semibold">{page}</span> of{" "}
            <span className="font-semibold">{maxPage}</span>
          </span>
        </div>
        <button
          onClick={() => incrementPage()}
          className="hover:z-1 focus:z-1 active:z-1 inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-4 py-2 font-semibold leading-6 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none"
        >
          <ChevronRightIcon />
        </button>
      </div>
    )
  );
}
