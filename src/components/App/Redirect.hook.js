import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Redirect({ path }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(path);
  });
}

Redirect.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Redirect;
