import { getDate, getTime } from "@helpers/formatDate";
import { getCategoryColor } from "@helpers/getCategoryColor";
import PropTypes from "prop-types";

function DemoSearchResultItem({ name, category, creationDate }) {
  return (
    <>
      <div className="flex-1 p-3 text-left">
        <p className="font-medium">{name}</p>
      </div>
      <div className="flex-1 p-3 text-center">
        <div
          className={`inline-flex rounded-full border border-transparent px-2 py-1 text-xs font-semibold leading-4
          ${getCategoryColor(category)}`}
        >
          {category}
        </div>
      </div>
      <div className="flex-1 p-3 text-right">
        <div>{getDate(creationDate)}</div>
        <div className="text-gray-400">{getTime(creationDate)}</div>
      </div>
    </>
  );
}

DemoSearchResultItem.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
};

export default DemoSearchResultItem;
