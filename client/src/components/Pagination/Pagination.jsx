import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";

export default function Pagination({
  currentPage,
  setCurrentPage,
  productsPerPage,
  totalProducts,
}) {
  const pageNumbers = [];
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginateNext = () => {
    setCurrentPage(currentPage + 1);
    //show next set of pag numbers
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);
    //show prev set of pagNumbers

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  return (
    <nav className="flex items-center dark:bg-gray-900 dark:text-white justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        {currentPage > 1 && (
          <a
            onClick={() => paginatePrev()}
            className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            <ArrowLongLeftIcon
              className="mr-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Previous
          </a>
        )}
      </div>
      <div className="hidden md:-mt-px md:flex">
        {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}

        {pageNumbers.map((number) => {
          if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
              <a
                key={number}
                onClick={() => paginate(number)}
                className={
                  currentPage === number
                    ? `border-indigo-500 text-indigo-600 inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium `
                    : "inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }
              >
                {number}
              </a>
            );
          }
        })}
      </div>

      {/* <div className="mx-4 my-0">
        <p>
          <span className="text-indigo-500">page {currentPage}</span>of{" "}
          {pageNumbers.length}
        </p>
      </div> */}

      <div className="-mt-px flex w-0 flex-1 mx-6">
        <p className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
          <span className="mr-3 h-auto w-12 text-indigo-500" aria-hidden="true">
            page {currentPage}
          </span>
          of {pageNumbers.length}
        </p>
      </div>

      <div className="-mt-px flex w-0 flex-1 justify-end">
        {currentPage < pageNumbers.length && (
          <a
            onClick={paginateNext}
            className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Next
            <ArrowLongRightIcon
              className="ml-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </a>
        )}
      </div>
    </nav>
  );
}
