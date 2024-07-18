import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Link, NavLink } from "react-router-dom";

// inline-flex items-center text-sm lg:text-[15px] font-medium text-slate-700 dark:text-slate-300 py-2.5 px-4 xl:px-5 rounded-full hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200

const NavigationItem = ({ menuItem }) => {
  const renderMainItem = (item) => {
    return (
      <div className="h-20 flex-shrink-0 flex items-center">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${"inline-flex items-center text-sm lg:text-[15px] font-medium   py-2.5 px-4 xl:px-5 rounded-full text-slate-900 bg-slate-100 dark:bg-slate-800 dark:text-slate-200 "}`
              : `inline-flex items-center text-sm lg:text-[15px] font-medium text-slate-700 dark:text-slate-300 py-2.5 px-4 xl:px-5 rounded-full hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200`
          }
          to={item.href}
        >
          {item.name}
          {item.type && (
            <ChevronDownIcon
              className="ml-1 -mr-1 h-4 w-4 text-slate-400"
              aria-hidden="true"
            />
          )}
        </NavLink>
      </div>
    );
  };

  return (
    <li className="menu-item flex-shrink-0">{renderMainItem(menuItem)}</li>
  );
};

export default NavigationItem;
