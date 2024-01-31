import Image from "next/image";
import React, { ReactNode, useState } from "react";
import { motion } from "framer-motion";
interface Props {
  url: string;
  name: string;
  imageUrls: string[];
}

const ImageMagnifier = ({ url, name, imageUrls }: Props) => {
  const [isMagnifying, setIsMagnifying] = useState(false);
  const [mPos, setMousePos] = useState({ x: 0, y: 0 });

  const onMouseEnter = () => {
    if (!isMagnifying) {
      setIsMagnifying(true);
    }
  };

  const onMouseLeave = () => {
    if (isMagnifying) {
      setIsMagnifying(false);
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isMagnifying) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / (e.target as HTMLElement).clientWidth,
        y: (e.clientY - rect.top) / (e.target as HTMLElement).clientHeight,
      });
    }
  };

  return (
    <>
      <div
        className={`relative rounded-lg overflow-hidden cursor-crosshair`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
      >
        <div
          className="bg-no-repeat absolute inset-0 bg-[length:175%] cursor-crosshair "
          style={{
            backgroundImage: `url('${url}')`,
            backgroundPosition: `${mPos.x * 100}% ${mPos.y * 100}%`,
            display: isMagnifying ? "block" : "none",
          }}
        ></div>

        <motion.div
          key={url}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            width={360}
            height={360}
            alt={`${name} 1`}
            src={url}
            className="w-full rounded-xl object-contain max-h-[360px] min-h-[360px]"
          />
        </motion.div>
      </div>
    </>
  );
};

export default ImageMagnifier;
