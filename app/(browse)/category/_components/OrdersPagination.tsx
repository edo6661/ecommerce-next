"use client";

import { Button } from "@/components/ui/button";
import { generatePagination } from "@/helpers";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const OrdersPagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || 1;

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(pageNumber));
    return `${pathname}?${String(params)}`;
  };

  const allPages = generatePagination(
    totalPages,
    Number(searchParams.get("page"))
  );

  const disabled = "opacity-50 cursor-not-allowed";
  return (
    <>
      <div className="fl-center gap-2">
        {currentPage && (
          <Link
            href={createPageUrl(Number(currentPage) - 1)}
            className={`${currentPage == 1 && disabled}`}
          >
            <ArrowLeft />
          </Link>
        )}
        {allPages.map((page, i) => {
          const disabledFirstPage = i == 0 && currentPage == 1 ? disabled : "";
          const disabledLastPage =
            i == totalPages - 1 && currentPage == totalPages ? disabled : "";

          return (
            <Link key={page} href={createPageUrl(page)}>
              <Button
                className={`${
                  currentPage === String(page) ? "focusedWord" : ""
                } ${disabledFirstPage} ${disabledLastPage}`}
              >
                {page}
              </Button>
            </Link>
          );
        })}
        {currentPage && (
          <Link
            href={createPageUrl(Number(currentPage) + 1)}
            className={`${currentPage == totalPages && disabled}`}
          >
            <ArrowRight />
          </Link>
        )}
      </div>
    </>
  );
};

export default OrdersPagination;
