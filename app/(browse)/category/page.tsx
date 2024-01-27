import Title from "@/components/shared/Title";
import Link from "next/link";
import React from "react";
import { FaCaretRight } from "react-icons/fa";

const page = () => {
  return (
    <section className="container py-4 space-y-4">
      <div className="fl-center gap-2">
        <Link className=" hoveredText " href="/">
          Mugichawn
        </Link>
        <FaCaretRight />
        <Link className="focusedWord " href="/category">
          Category
        </Link>
      </div>
      <Title label="Category" className="ignorePadding" />
    </section>
  );
};

export default page;
