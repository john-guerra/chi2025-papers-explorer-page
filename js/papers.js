import { renderCellIfelementExists, loadHTMLInto } from "./utils.js";

import { Runtime } from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";

import define from "https://api.observablehq.com/@john-guerra/chi2025-mypapers@latest.js?v=4";

export const notebook = new Runtime().module(define, (name) => {
  const cells = [
    "drChart",
    "addRemoveDR",
    "queryEle",
    "viewof scoreSelection",
    "addRemoveSearch",
    "viewof searchTable",
    "viewof attrsTable",
    "tracksSelector",
    "authorsSelector",
    "affiliationsSelector",
    "facetedSearchSelector",
    "addRemoveFaceted",
    "viewof myPapers",
    "onScoreUpdate",
    "maxRSelector",
  ];

  if (cells.includes(name)) return renderCellIfelementExists(name);
});

async function onResize() {
  console.log("resize", document.getElementById("mainSection").offsetWidth);
  notebook.redefine(
    "width",
    document.getElementById("mainSection").offsetWidth
  );
  notebook.redefine("height", window.innerHeight * 0.2);
  const maxR = await notebook.value("maxRSelector");
  maxR.value = 50;
  maxR.dispatchEvent(new Event("input"), { bubbles: true });
  notebook.redefine("myPapersHeight", window.innerHeight * 0.9);
}
window.addEventListener("resize", onResize);
onResize();

loadHTMLInto("navigation.html", document.getElementById("navigation"));
loadHTMLInto("footer.html", document.getElementById("footer"));
