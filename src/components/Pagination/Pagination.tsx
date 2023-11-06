import { Box } from '@mui/material';
import React, { Fragment } from 'react';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from: number, to: number, step = 1): Array<number | string> => {
  let i = from;
  const range = [];
  while (i <= to) {
    range.push(i);
    i += step;
  }
  return range;
};

interface PaginatePropsType {
  pageCount: number;
  pageIndex: number;
  gotoPage: (page: number) => void;
  previousPage: () => void;
  nextPage: () => void;
}
const Paginate = ({
  pageCount,
  pageIndex,
  gotoPage,
  previousPage,
  nextPage,
}: PaginatePropsType) => {
  const fetchPageNumbers = () => {
    const pageNeighbours = 2;
    const totalNumbers = pageNeighbours;
    const totalBlocks = Math.min(totalNumbers, pageCount);
    const currentPage = pageIndex;
    const totalPages = pageCount;
    if (totalPages > totalBlocks) {
      const startPage = Math.max(1, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages, currentPage + pageNeighbours);
      let pages = range(startPage, endPage);
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);
      switch (true) {
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }
      return [...pages];
    }
    return range(1, totalPages);
  };
  const pages = fetchPageNumbers();
  return (
    <>
      <Fragment>
        <nav
          className="isolate inline-flex rounded-md shadow-sm"
          aria-label="Pagination"
          key={pageIndex}
        >
          <Box
            onClick={() => {
              if (pageIndex === 0) {
                return;
              }
              gotoPage(0);
            }}
            className={` ${
              pageIndex === 0 ? 'bg-slate-200' : ''
            } relative mr-2 cursor-pointer inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
          >
            <span className="sr-only">Previous</span>
            <svg width="20" height="20" viewBox="0 0 20 20" className="h-5 w-5">
              <path
                fill="currentColor"
                d="M6 5a.5.5 0 0 0-.492.41L5.5 5.5v9a.5.5 0 0 0 .992.09l.008-.09v-9A.5.5 0 0 0 6 5Zm7.854.146a.5.5 0 0 0-.638-.057l-.07.057l-4.5 4.5a.5.5 0 0 0-.057.638l.057.07l4.5 4.5a.5.5 0 0 0 .765-.638l-.057-.07L9.707 10l4.147-4.146a.5.5 0 0 0 0-.708Z"
              />
            </svg>
          </Box>

          {pages.map((page) => {
            if (page === LEFT_PAGE)
              return (
                <Box
                  key={page}
                  onClick={() => previousPage()}
                  className="relative cursor-pointer inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Box>
              );
            if (page === RIGHT_PAGE)
              return (
                <Box
                  key={page}
                  onClick={() => nextPage()}
                  className="relative cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Box>
              );

            if (typeof page === 'number') {
              return (
                <Box
                  key={page}
                  className={
                    page - 1 === pageIndex
                      ? 'relative cursor-pointer z-10 inline-flex items-center bg-gradient-to-b from-[#0063A0] to-[#073763] px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                      : 'relative cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  }
                  onClick={() => gotoPage(page - 1)}
                >
                  {page}
                </Box>
              );
            }
          })}

          <Box
            onClick={() => {
              if (pageCount - 1 === pageIndex) {
                return;
              }
              gotoPage(pageCount - 1);
            }}
            className={` ${
              pageCount - 1 === pageIndex ? 'bg-slate-200' : ''
            } relative ml-2 cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
          >
            <span className="sr-only">Next</span>
            <svg width="16" height="16" viewBox="0 0 16 16" className="h-5 w-5">
              <path
                fill="currentColor"
                d="M3.646 3.854a.5.5 0 1 1 .708-.708l4.5 4.5a.5.5 0 0 1 0 .708l-4.5 4.5a.5.5 0 0 1-.708-.708L7.793 8L3.646 3.854ZM12 3.5a.5.5 0 0 0-1 0v9a.5.5 0 0 0 1 0v-9Z"
              />
            </svg>
          </Box>
        </nav>
      </Fragment>
    </>
  );
};
export default Paginate;
