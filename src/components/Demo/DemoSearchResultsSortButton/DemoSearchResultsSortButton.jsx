import PropTypes from "prop-types";
import Status from "./status";

function DemoSearchResultsSortButton({ sortStatus }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-1.5 py-1 text-sm font-semibold leading-5 text-gray-800 
      transition hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none
      ${
        sortStatus === Status.NOT_SORTED && "opacity-25 group-hover:opacity-100"
      }`}
    >
      <svg
        className={`hi-mini ${
          sortStatus === Status.NOT_SORTED
            ? "hi-chevron-up-down"
            : sortStatus === Status.INCREASING
              ? "hi-chevron-up"
              : "hi-chevron-down"
        } inline-block size-4`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d={
            sortStatus === Status.NOT_SORTED
              ? "M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
              : sortStatus === Status.INCREASING
                ? "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                : "M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
          }
          clipRule="evenodd"
        />
      </svg>
    </button>
    // <button
    //   type="button"
    //   className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-1.5 py-1 text-sm font-semibold leading-5 text-gray-800
    //  transition hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none"
    // >
    //   <svg
    //     className="hi-mini hi-chevron-up-down inline-block size-4"
    //     xmlns="http://www.w3.org/2000/svg"
    //     viewBox="0 0 20 20"
    //     fill="currentColor"
    //     aria-hidden="true"
    //   >
    //     {sortStatus === Status.DECREASING && (
    //       <path
    //         fillRule="evenodd"
    //         d={
    //           // sortStatus === Status.NOT_SORTED
    //           "M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
    //           // : sortStatus === Status.INCREASING
    //           // ? "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
    //           // : "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
    //         }
    //         clipRule="evenodd"
    //       />
    //     )}
    //   </svg>
    // </button>
  );
}

DemoSearchResultsSortButton.propTypes = {
  sortStatus: PropTypes.string.isRequired,
};

export default DemoSearchResultsSortButton;
