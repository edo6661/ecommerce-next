"use client";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useCallback, useState } from "react";
import { RxDividerVertical } from "react-icons/rx";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const router = useRouter();
  const [q, setQ] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQ(e.target.value);

  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      setQ("");
      router.push(`/search?q=${q}&limit=6&page=1`);
    },
    [router, q]
  );

  return (
    <>
      <form className="relative flex-1" onSubmit={handleSubmit}>
        <Input
          className=" pr-12 pl-4"
          placeholder="Search..."
          id="search"
          onChange={handleInput}
          value={q}
        />
        <span className="opacity-40 right-6 top-1/2 -translate-y-1/2 absolute">
          <RxDividerVertical size={40} />
        </span>
        <button className=" absolute right-3 top-1/2 -translate-y-1/2 ">
          <SearchIcon
            size={22}
            className=" hover:opacity-40 transition-opacity duration-200"
          />
        </button>
      </form>
    </>
  );
};

export default Search;
