import { getDate, getTime } from "@helpers/formatDate";
import { getCategoryColor } from "@helpers/getCategoryColor";
import PropTypes from "prop-types";

function DemoSearchResultItem({ name, category, creationDate }) {
  return (
    <tr className="even:bg-gray-50">
      <td className="p-3 text-left">
        <p className="font-medium">{name}</p>
      </td>
      <td className="p-3">
        <div
          className={`inline-flex rounded-full border border-transparent px-2 py-1 text-xs font-semibold leading-4
          ${getCategoryColor(category)}`}
        >
          {category}
        </div>
      </td>
      <td className="p-3 text-right">
        <div>{getDate(creationDate)}</div>
        <div className="text-gray-400">{getTime(creationDate)}</div>
      </td>
    </tr>
  );
}

DemoSearchResultItem.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
};

export default DemoSearchResultItem;
