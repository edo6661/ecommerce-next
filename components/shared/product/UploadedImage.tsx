import { Trash } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
interface Props {
  handleDeleteUpload: (i: number) => void;
  i: number;
  file: string;
}

const UploadedImage = ({ handleDeleteUpload, i, file }: Props) => {
  const vars = {
    initial: {
      opacity: 0,
      scale: 0.5,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        delay: i * 0.5,
      },
    },
  };

  return (
    <motion.div
      className="relative"
      variants={vars}
      initial="initial"
      animate="animate"
    >
      <Image
        className="mx-auto rounded-md w-full"
        width={300}
        height={300}
        alt={file}
        src={file}
      />
      <button
        type="button"
        className="keepModalOpen"
        onClick={() => handleDeleteUpload(i)}
      >
        <Trash className="trashModalActions text-red-700" />
      </button>
    </motion.div>
  );
};

export default UploadedImage;
