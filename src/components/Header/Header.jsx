import logo from "@assets/logo.svg";
import { BurgerIcon } from "@icons";
import { useState } from "react";
import HeaderButton from "./HeaderButton";

function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header
      id="page-header"
      className="z-1 flex-col items-center bg-blue-400 shadow-lg"
    >
      <div className="flex items-center justify-between space-x-4 p-4 sm:justify-normal">
        <div className="flex items-center space-x-4">
          <a href="/demo">
            <img src={logo} className="h-12" alt="HrFlow.ai Logo" />
          </a>
        </div>
        <nav className="hidden items-center space-x-4 sm:flex">
          <HeaderButton title="Demo" path="/demo"></HeaderButton>
          <HeaderButton title="About" path="/about"></HeaderButton>
        </nav>
        <div className="sm:hidden">
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            type="button"
            className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none "
          >
            <BurgerIcon />
          </button>
        </div>
      </div>

      <nav
        className={`sm:hidden 
        ${mobileNavOpen ? "" : "hidden"} 
        flex flex-col space-y-2 border-t bg-white
        bg-opacity-20 p-4`}
      >
        <HeaderButton title="Demo" path="/demo"></HeaderButton>
        <HeaderButton title="About" path="/about"></HeaderButton>
      </nav>
    </header>
  );
}

export default Header;
