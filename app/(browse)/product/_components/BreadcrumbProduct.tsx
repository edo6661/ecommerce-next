import { truncateWord, upperFirst } from "@/helpers";
import Link from "next/link";
import React from "react";
import { FaCaretRight } from "react-icons/fa";
interface Props {
  productName: string;
  categoryName: string;
}
const BreadcrumbProduct = ({ productName, categoryName }: Props) => {
  return (
    <article className="fl-center gap-2 sm:pb-2 pb-4">
      <Link className=" hoveredText " href="/">
        Mugichawn
      </Link>
      <FaCaretRight />
      <Link
        className="hoveredText"
        href={`/category/${encodeURI(categoryName!)}`}
      >
        {categoryName}
      </Link>
      <FaCaretRight />
      <p className="focusedWord sm:hidden">{truncateWord(productName, 9)}</p>
      <p className="focusedWord hidden sm:block">{upperFirst(productName)}</p>
    </article>
  );
};

export default BreadcrumbProduct;
