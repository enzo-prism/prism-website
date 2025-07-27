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

// Blog-specific animation variants

// Blog card 3D hover effect with GPU acceleration
export const blogCardHover3D: Variants = {
  initial: {
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    z: 0,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  hover: {
    scale: 1.02,
    z: 50,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 20px -5px rgba(0, 0, 0, 0.1)",
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
      ease: "easeInOut",
    },
  },
}

// Blog card perspective tilt based on mouse position
export const blogCardPerspective: Variants = {
  initial: {
    rotateX: 0,
    rotateY: 0,
    transformPerspective: 1000,
  },
  hover: (tilt: { x: number; y: number }) => ({
    rotateX: tilt.x * 10,
    rotateY: tilt.y * 10,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  }),
}

// Staggered grid entrance with GPU acceleration
export const staggeredGridEntrance: Variants = {
  initial: {
    opacity: 0,
    y: 60,
    scale: 0.8,
    z: -100,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    z: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

// Grid container for staggered animation
export const staggeredGridContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Filter button morphing animation
export const filterButtonMorph: Variants = {
  inactive: {
    backgroundColor: "rgb(245, 245, 245)",
    color: "rgb(23, 23, 23)",
    scale: 1,
    boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
  },
  active: {
    backgroundColor: "rgb(23, 23, 23)",
    color: "rgb(255, 255, 255)",
    scale: 1.05,
    boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.25)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.15)",
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
}

// Magnetic button effect for filter buttons
export const magneticFilter: Variants = {
  initial: {
    x: 0,
    y: 0,
  },
  hover: (magnetic: { x: number; y: number }) => ({
    x: magnetic.x * 0.3,
    y: magnetic.y * 0.3,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  }),
}

// Parallax hero section
export const parallaxHero: Variants = {
  initial: {
    y: 0,
    scale: 1,
  },
  animate: (scrollY: number) => ({
    y: scrollY * 0.5,
    scale: 1 + scrollY * 0.0002,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 90,
    },
  }),
}

// Text reveal animation for hero
export const textReveal: Variants = {
  initial: {
    opacity: 0,
    y: 100,
    skewY: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
}

// CTA button floating animation
export const ctaButtonFloat: Variants = {
  initial: {
    y: 0,
    rotate: 0,
  },
  animate: {
    y: [-2, 2, -2],
    rotate: [-0.5, 0.5, -0.5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

// CTA button glow effect
export const ctaButtonGlow: Variants = {
  initial: {
    boxShadow: "0 0 0 0 rgba(23, 23, 23, 0)",
  },
  hover: {
    boxShadow: [
      "0 0 0 0 rgba(23, 23, 23, 0)",
      "0 0 20px 5px rgba(23, 23, 23, 0.2)",
      "0 0 40px 10px rgba(23, 23, 23, 0.1)",
    ],
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

// Loading shimmer effect for blog cards
export const blogCardShimmer: Variants = {
  initial: {
    backgroundPosition: "-200% 0",
  },
  animate: {
    backgroundPosition: "200% 0",
    transition: {
      duration: 1.5,
      ease: "linear",
      repeat: Infinity,
      repeatDelay: 0.5,
    },
  },
}

// Scroll-triggered reveal with intersection observer
export const scrollRevealBlog: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
    filter: "blur(2px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

// Premium animations for Get Started page
export const luxuryFadeIn: Variants = {
  initial: { 
    opacity: 0, 
    y: 30, 
    filter: "blur(10px)" 
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { 
      duration: 0.8, 
      ease: [0.25, 0.1, 0.25, 1] 
    }
  }
}

export const iridescent: Variants = {
  initial: {
    backgroundPosition: "0% 50%",
  },
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: { 
      duration: 5, 
      repeat: Infinity, 
      ease: "linear" 
    }
  }
}

export const premiumPulse: Variants = {
  initial: {
    scale: 1,
    opacity: 1,
  },
  animate: {
    scale: [1, 1.02, 1],
    opacity: [1, 0.9, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }
  }
}

export const exclusiveReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotateX: -30,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.7,
      ease: [0.6, -0.05, 0.01, 0.99],
    }
  }
}

export const luxuryCardHover: Variants = {
  initial: {
    y: 0,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  hover: {
    y: -8,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 20px -5px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    }
  }
}