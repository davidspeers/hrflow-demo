import { Menu, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@icons";
import { selectSortFilter, updateSortFilter } from "@stores/search/searchSlice";
import SortFilter from "@types/sortFilter";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

function DemoToolbarSortDropdown() {
  const dispatch = useDispatch();

  const sortFilter = useSelector(selectSortFilter);

  return (
    <div className="flex justify-end">
      <Menu as="div" className="relative inline-block">
        <Menu.Button className="inline-flex items-center justify-center space-x-2 rounded-lg border border-blue-700 bg-blue-700 px-3 py-2 text-sm font-semibold leading-5 text-white hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:ring focus:ring-blue-400 focus:ring-opacity-50 active:border-blue-700 active:bg-blue-700">
          <span>
            {sortFilter === SortFilter.CUSTOM
              ? "Custom Order"
              : `Ordered by ${sortFilter}`}
          </span>
          <ChevronDownIcon />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="opacity-0 scale-90"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-90"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg shadow-xl focus:outline-none">
            <div className="divide-y divide-gray-100 rounded-lg bg-white ring-1 ring-black ring-opacity-5">
              {Object.values(SortFilter)
                .filter((value) => value !== SortFilter.CUSTOM)
                .map((value, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <div
                        onClick={() => dispatch(updateSortFilter(value))}
                        className={`flex cursor-pointer items-center justify-between border border-transparent px-2.5 py-2 text-sm font-medium ${
                          active
                            ? "bg-blue-50 text-blue-800"
                            : "text-gray-700 hover:bg-blue-50 hover:text-blue-800 active:border-blue-100"
                        }`}
                      >
                        {value === sortFilter && <CheckIcon />}
                        <span className="grow">{value}</span>
                      </div>
                    )}
                  </Menu.Item>
                ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default DemoToolbarSortDropdown;
