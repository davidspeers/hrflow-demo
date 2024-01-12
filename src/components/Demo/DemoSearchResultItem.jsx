import PropTypes from "prop-types";

function DemoSearchResultItem({ name, category, creationDate }) {
  return (
    <tr className="even:bg-gray-50">
      <td className="p-3">
        <p className="font-medium">{name}</p>
      </td>
      <td className="p-3">
        <div className="inline-flex rounded-full border border-transparent bg-emerald-100 px-2 py-1 text-xs font-semibold leading-4 text-emerald-900">
          {category}
        </div>
      </td>
      <td className="p-3 text-right">{creationDate}</td>
    </tr>
  );
}

DemoSearchResultItem.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
};

export default DemoSearchResultItem;
