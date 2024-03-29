import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

function HeaderButton({ title, path }) {
  const location = useLocation();
  const isActive =
    location.pathname == path || location.pathname.startsWith(`${path}/`);

  return (
    <a
      href={path}
      className={`group flex items-center space-x-2 rounded-lg border
      ${isActive ? "border-blue-100 bg-blue-50" : "border-transparent"}
      px-3 py-2 text-sm font-medium
      ${
        isActive
          ? "text-blue-600"
          : "text-gray-800 hover:bg-blue-50 hover:text-blue-600 active:border-blue-100"
      }
      `}
    >
      <span>{title}</span>
    </a>
  );
}

HeaderButton.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default HeaderButton;
