export const stepTransitionVars = {
  transition: {
    ease: "linear",
    duration: 0.5,
  },
};

export const appearTransitionVars = {
  scale: 1,
  opacity: 1,
  filter: "blur(0)",
  transition: {
    duration: 0.3,
    ease: "easeInOut",
    delay: 0.1,
  },
};

const visible = {
  opacity: 1,
};

const hidden = {
  opacity: 0,
};

export const firstStepAddProductVars = {
  initial: {
    x: 0,
    ...visible,
  },
  animate: {
    x: "-100%",
    ...hidden,
    ...stepTransitionVars,
  },
  reverse: {
    x: "0%",
    ...stepTransitionVars,
    ...visible,
  },
};
export const secondStepAddProductVars = {
  initial: {
    x: "100%",
    ...hidden,
  },
  animate: {
    x: "0",
    ...visible,
    ...stepTransitionVars,
  },
  exit: {
    x: "-100%",
    ...hidden,
    ...stepTransitionVars,
  },
};

export const actionsModalVars = {
  initial: {
    scale: 0.75,
    filter: "blur(50px)",
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    filter: "blur(0)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      delay: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.75,
    filter: "blur(50px)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      delay: 0.1,
    },
  },
};

export const categoryVars = {
  initial: {
    height: "0",
    scale: 0.5,
    filter: "blur(50px)",
    opacity: 0,
  },
  animate: {
    height: "auto",
    scale: 1,
    opacity: 1,
    filter: "blur(0)",
    transition: {
      duration: 0.3,
      // ease: "easeInOut",
      delay: 0.1,
      staggerChildren: 0.5,
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    scale: 0.75,
    filter: "blur(50px)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      delay: 0.1,
    },
  },
};

export const posterSlideVars = {
  initial: (direction: number) => {
    return {
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    };
  },
  animate: (direction: number) => {
    return {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
      },
    };
  },
  exit: (direction: number) => {
    return {
      x: direction > 0 ? -200 : 200,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 200,
      },
    };
  },
};

export const actionsPosterVars = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.3,
    },
  },
};

export const cardProps = {
  initial: {
    opacity: 0,
    scale: 1,
  },
  view: {
    opacity: 1,
    transition: {
      type: "spring",
    },
  },
  animate: {
    scale: 1.03,
    transition: {
      type: "spring",
    },
    opacity: 0.9,
    filter: "blur(0.5px)",
  },
  exit: {
    scale: 1,
    transition: {
      type: "spring",
    },
    filter: "blur(0)",
  },
};

export const productCardProps = {
  ...cardProps,
  animate: {
    ...cardProps.animate,
    scale: 1.005,
  },
};

export const viewAllVars = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      type: "spring",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      type: "spring",
    },
  },
};

export const dropdownVars = {
  animate: {
    rotate: "180deg",
    transition: {
      type: "spring",
    },
  },
  exit: {
    rotate: "0deg",
    transition: {
      type: "spring",
    },
  },
};
