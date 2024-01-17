import { useState, useEffect } from "react";

const useWidth = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return width;
};

export default useWidth;
