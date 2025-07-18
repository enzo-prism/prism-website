import { Variants } from "framer-motion"

// Entrance animations with GPU acceleration
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.3,
    },
  },
}

// Stagger children animations
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// 3D card animations
export const card3D: Variants = {
  initial: {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    z: 0,
  },
  hover: {
    z: 50,
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.98,
    z: 0,
    transition: {
      duration: 0.1,
    },
  },
}

// Spring physics animations
export const springScale: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
}

// Parallax scroll effect
export const parallaxY: Variants = {
  initial: {
    y: 0,
  },
  animate: (scrollProgress: number) => ({
    y: scrollProgress * -50,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 90,
    },
  }),
}

// Magnetic button effect
export const magneticButton: Variants = {
  initial: {
    x: 0,
    y: 0,
  },
  hover: (position: { x: number; y: number }) => ({
    x: position.x * 0.2,
    y: position.y * 0.2,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15,
    },
  }),
}

// Shimmer effect for highlights
export const shimmer: Variants = {
  initial: {
    backgroundPosition: "-200% 0",
  },
  animate: {
    backgroundPosition: "200% 0",
    transition: {
      duration: 2,
      ease: "linear",
      repeat: Infinity,
      repeatDelay: 3,
    },
  },
}

// Accordion animations
export const accordionContent: Variants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: 0.3,
        ease: "easeInOut",
      },
      opacity: {
        duration: 0.2,
        delay: 0,
      },
    },
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      height: {
        duration: 0.3,
        ease: "easeInOut",
      },
      opacity: {
        duration: 0.2,
        delay: 0.1,
      },
    },
  },
}

// Floating animation
export const float: Variants = {
  initial: {
    y: 0,
    rotateZ: 0,
  },
  animate: {
    y: [-5, 5, -5],
    rotateZ: [-1, 1, -1],
    transition: {
      y: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
      rotateZ: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
}

// Glow pulse effect
export const glowPulse: Variants = {
  initial: {
    boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
  },
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(0, 0, 0, 0)",
      "0 0 20px 10px rgba(0, 0, 0, 0.1)",
      "0 0 0 0 rgba(0, 0, 0, 0)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

// Page transition variants
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
}

// Reveal on scroll variants
export const revealOnScroll: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

// 3D perspective tilt
export const perspective3D: Variants = {
  initial: {
    rotateX: 0,
    rotateY: 0,
  },
  hover: (rotation: { x: number; y: number }) => ({
    rotateX: rotation.x,
    rotateY: rotation.y,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  }),
}

// Success animation
export const successPop: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
    rotate: -180,
  },
  animate: {
    scale: [0, 1.2, 1],
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: [0.175, 0.885, 0.32, 1.275],
    },
  },
}