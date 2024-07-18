import React from "react";

import { Disclosure } from "@headlessui/react";

import { ChevronDownIcon } from "@heroicons/react/24/solid";

import { IoMdClose } from "react-icons/io";

export const NAVIGATION_DEMO_2 = [
  {
    id: 1,
    href: "/collection",
    name: "Men",
  },
  {
    id: 2,
    href: "/collection-2",
    name: "Women",
  },
  {
    id: 3,
    href: "/collection",
    name: "Beauty",
  },

  {
    id: 4,
    href: "/collection-2",
    name: "Sport",
  },
];

const NavMobile = ({ data = NAVIGATION_DEMO_2, onClickClose }) => {
  const _renderMenuChild = (
    item,
    itemClass = " pl-3 text-neutral-900 dark:text-neutral-200 font-medium "
  ) => {
    return (
      <ul className="nav-mobile-sub-menu pl-6 pb-1 text-base">
        {item.children?.map((i, index) => (
          <Disclosure key={index} as="li">
            <a
              href={{
                pathname: i.href || undefined,
              }}
              className={`flex text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-0.5 pr-4 ${itemClass}`}
            >
              <span
                className={`py-2.5 ${!i.children ? "block w-full" : ""}`}
                onClick={onClickClose}
              >
                {i.name}
              </span>
              {i.children && (
                <span
                  className="flex items-center flex-grow"
                  onClick={(e) => e.preventDefault()}
                >
                  <Disclosure.Button
                    as="span"
                    className="flex justify-end flex-grow"
                  >
                    <ChevronDownIcon
                      className="ml-2 h-4 w-4 text-slate-500"
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                </span>
              )}
            </a>
            {i.children && (
              <Disclosure.Panel>
                {_renderMenuChild(
                  i,
                  "pl-3 text-slate-600 dark:text-slate-400 "
                )}
              </Disclosure.Panel>
            )}
          </Disclosure>
        ))}
      </ul>
    );
  };

  const _renderItem = (item, index) => {
    return (
      <Disclosure
        key={index}
        as="li"
        className="text-slate-900 dark:text-white"
      >
        <a
          className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          href={{
            pathname: item.href || undefined,
          }}
        >
          <span
            className={!item.children ? "block w-full" : ""}
            onClick={onClickClose}
          >
            {item.name}
          </span>
          {item.children && (
            <span
              className="block flex-grow"
              onClick={(e) => e.preventDefault()}
            >
              <Disclosure.Button
                as="span"
                className="flex justify-end flex-grow"
              >
                <ChevronDownIcon
                  className="ml-2 h-4 w-4 text-neutral-500"
                  aria-hidden="true"
                />
              </Disclosure.Button>
            </span>
          )}
        </a>
        {item.children && (
          <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
        )}
      </Disclosure>
    );
  };

  //

  return (
    <div className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5">
        {/* <Logo /> */}
        <h1 className="text-white text-2xl font-black">E com</h1>
        <div className="flex flex-col mt-5 text-slate-600 dark:text-slate-300 text-sm">
          <span>
            Discover the most outstanding articles on all topics of life. Write
            your stories and share them
          </span>

          {/* <div className="flex justify-between items-center mt-4">
            <SocialsList itemClass="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xl" />
            <span className="block">
              <SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800" />
            </span>
          </div> */}
        </div>
        <span className="absolute right-2 top-2 p-1">
          <IoMdClose onClick={onClickClose} className="w-8 h-8 text-white" />
        </span>
      </div>
      <ul className="flex flex-col py-6 px-2 space-y-1">
        {data.map(_renderItem)}
      </ul>
    </div>
  );
};

export default NavMobile;
