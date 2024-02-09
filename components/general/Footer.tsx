"use client";
import { FaGithubAlt } from "react-icons/fa";
import { montserrat } from "@/lib/utils";
import { usePathname } from "next/navigation";
const Footer = () => {
  const scrolltoTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pathname = usePathname();
  const noFooter = pathname.includes("/product") || pathname.includes("/cart");

  return (
    <>
      {!noFooter && (
        <footer
          className={`overflow-x-hidden dark:bg-white text-black p-4 ${montserrat.className} font-semibold `}
        >
          <div className="container md:text-2xl sm:text-xl text-base fl-center justify-between">
            <button onClick={scrolltoTop}>Scroll to Top</button>
            <a
              className="relative flex items-center mr-4"
              target="_blank"
              href="https://github.com/edo6661/ecommerce-next"
            >
              <span className=" text-pinky mr-1">&copy; </span>
              Halo Mamaah
              <span className="absolute -right-7">
                <FaGithubAlt />
              </span>
            </a>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
