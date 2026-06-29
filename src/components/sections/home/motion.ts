export const expo   = [0.16, 1, 0.3, 1] as const;
export const smooth = [0.25, 0, 0, 1]   as const;

export const fadeUp = {
  hidden:  { opacity: 0, y: 48, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0,  filter: "blur(0px)" },
};

export const fadeLeft = {
  hidden:  { opacity: 0, x: -40, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0,   filter: "blur(0px)" },
};

export const fadeRight = {
  hidden:  { opacity: 0, x: 40, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0,  filter: "blur(0px)" },
};

export const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const staggerFast = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

export const viewportOnce = { once: true, amount: 0.4, margin: "0px 0px -60px 0px" };