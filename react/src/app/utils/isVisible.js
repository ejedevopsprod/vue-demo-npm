const isVisible = (nodes, position, width, height) => {
  let visible = false;
  let isDescendant = false;
  nodes.map((e, i) => {
    if (
      e &&
      e.anchor.x + position.x + width >= 0 &&
      e.anchor.x + position.x <= window.innerWidth
    ) {
      visible = true;
      if (i > 1) {
        isDescendant = true;
      }
    }
  });
  return { res: visible, isDescendant };
};

export default isVisible;
