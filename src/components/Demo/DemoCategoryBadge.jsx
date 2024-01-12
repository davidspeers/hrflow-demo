import { getCategoryColor } from "@helpers/getCategoryColor";
import PropTypes from "prop-types";

function DemoCategoryBadge({ category }) {
  return (
    <div
      className={`inline-flex rounded-full border border-transparent px-2 py-1 text-xs font-semibold leading-4
            ${getCategoryColor(category)}`}
    >
      {category}
    </div>
  );
}

DemoCategoryBadge.propTypes = {
  category: PropTypes.string.isRequired,
};

export default DemoCategoryBadge;
