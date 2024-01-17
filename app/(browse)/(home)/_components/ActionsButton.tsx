import { AnimatePresence, motion } from "framer-motion";
import { actionsPosterVars } from "@/utils/framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SliderButtonProps {
  onClick: () => void;
  direction: "left" | "right";
  children: React.ReactNode;
  isHover: boolean;
}

const ActionButton = ({
  onClick,
  direction,
  children,
  isHover,
}: SliderButtonProps) => {
  const positionClass =
    direction === "left" ? "left-0 rounded-l-sm" : "right-0 rounded-r-sm";

  return (
    <AnimatePresence>
      {isHover && (
        <motion.div
          className={`absolute top-1/2 -translate-y-1/2 ${positionClass}`}
          onClick={onClick}
          variants={actionsPosterVars}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Button
            className={cn(
              "opacity-50 hover:opacity-90 h-16 transition-opacity duration-400  relative w-7",
              direction === "left" ? "rounded-l-none" : "rounded-r-none"
            )}
            size="icon"
          >
            {children}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ActionButton;
