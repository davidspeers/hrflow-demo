import { getCategoryColor } from "@helpers/getCategoryColor";
import { CloseIcon } from "@icons";
import { removeFromCategoryFilters } from "@stores/search/searchSlice";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

function DemoToolbarCategoryFilterBadge({ category }) {
  const dispatch = useDispatch();

  return (
    <div
      className={`mb-2 mr-2 inline-flex items-center rounded-full border border-transparent px-2 py-1 text-xs font-semibold leading-4
              ${getCategoryColor(category)}`}
    >
      <span className="pb-px">{category}</span>
      <button onClick={() => dispatch(removeFromCategoryFilters(category))}>
        <CloseIcon />
      </button>
    </div>
  );
}

DemoToolbarCategoryFilterBadge.propTypes = {
  category: PropTypes.string.isRequired,
};

export default DemoToolbarCategoryFilterBadge;
