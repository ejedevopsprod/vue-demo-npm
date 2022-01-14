export default function rasterizeSVG(svg, size) {
  const domElement = document.createElement("div");

  domElement.innerHTML += svg;

  domElement.firstElementChild.setAttribute("width", size[0]);
  domElement.firstElementChild.setAttribute("height", size[1]);

  return new XMLSerializer().serializeToString(
    domElement.firstElementChild.cloneNode(true)
  );
}
