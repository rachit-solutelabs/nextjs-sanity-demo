const transitions = {
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
export default transitions;
