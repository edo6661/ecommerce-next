import { Button } from "@/components/ui/button";
import { generatePagination } from "@/helpers";
import Link from "next/link";
import React from "react";

const SearchPagination = ({
  totalPages,
  currentPage,
  q,
  limit,
}: {
  totalPages: number;
  currentPage: number;
  q: string;
  limit: number;
}) => {
  const allPages = generatePagination(totalPages, currentPage);
  const disabled = "opacity-75 cursor-not-allowed";

  return (
    <>
      <div className="fl-center justify-center">
        {allPages.map((page, i) => {
          const disabledFirstPage = i == 0 && currentPage == 1 ? disabled : "";
          const disabledLastPage =
            totalPages == 1
              ? "rounded-xl"
              : i == totalPages - 1 && currentPage == totalPages
              ? disabled
              : "";
          const optionalRounded =
            i === 0
              ? "rounded-l-xl"
              : i === totalPages - 1
              ? "rounded-r-xl"
              : "";

          return (
            <Link
              key={page}
              href={`/search?q=${q}&limit=${limit}&page=${page}`}
            >
              <Button
                className={`rounded-none ${
                  i === +currentPage - 1 ? disabled : ""
                } ${disabledFirstPage} ${disabledLastPage} ${optionalRounded}`}
              >
                {page}
              </Button>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default SearchPagination;
