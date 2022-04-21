export const transitionsTop = {
  entering: {
    display: "block",
  },
  entered: {
    transform: "scaleY(1)",
    display: "block",
  },
  exiting: {
    transform: "scaleY(0)",
    display: "block",
  },
  exited: {
    transform: "scaleY(0)",
    display: "none",
  },
};

export const transitionsLeft = {
  entering: {
    display: "flex",
  },
  entered: {
    transform: "scale(1)",
    display: "flex",
  },
  exiting: {
    transform: "scale(0)",
    display: "flex",
  },
  exited: {
    transform: "scale(0)",
    display: "none",
  },
};
