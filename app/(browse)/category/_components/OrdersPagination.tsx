"use client";

import { Button } from "@/components/ui/button";
import { generatePagination } from "@/helpers";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound, usePathname, useSearchParams } from "next/navigation";

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

  if (Number(currentPage) > totalPages) return notFound();

  const disabled = "opacity-75   cursor-not-allowed";

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
            <Link key={page} href={createPageUrl(page)}>
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

export default OrdersPagination;
