import { Inspector } from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";

export function renderCellIfelementExists(cell) {
  const ele = document.getElementById(
    `observablehq-${cell.replace(" ", "-")}-702d78f5`
  );
  return ele ? new Inspector(ele) : true;
}

export function loadHTMLInto(htmlPage, element) {
  fetch(htmlPage)
    .then((response) => response.text())
    .then((html) => {
      element.innerHTML = html;
    });
}
