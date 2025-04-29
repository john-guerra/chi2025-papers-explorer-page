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
    "whatToAttend",
    "papersListElement",
    "viewof sortBy",
    "viewof myPapersSearched",
  ];

  if (cells.includes(name)) return renderCellIfelementExists(name);
});

async function onResize() {
  console.log("resize", document.getElementById("mainSection").offsetWidth);
  notebook.redefine(
    "width",
    document.getElementById("mainSection").offsetWidth - 50
  );
  notebook.redefine("height", window.innerHeight * 0.2);
  const maxR = await notebook.value("maxRSelector");
  maxR.value = 50;
  maxR.dispatchEvent(new Event("input"), { bubbles: true });
  notebook.redefine("myPapersHeight", Math.max(window.innerHeight * 0.3, 300));
}
// window.addEventListener("resize", onResize);
onResize();

loadHTMLInto("navigation.html", document.getElementById("navigation"));
loadHTMLInto("footer.html", document.getElementById("footer"));

const authorsSelector = await notebook.value("authorsSelector");
const affiliationsSelector = await notebook.value("affiliationsSelector");
const tracksSelector = await notebook.value("tracksSelector");
const spanAuthorsSelected = document.getElementById("spanAuthorsSelected");
const spanAffiliationsSelected = document.getElementById(
  "spanAffiliationsSelected"
);
const spanTracksSelected = document.getElementById("spanTracksSelected");

function onUpdateFilters() {
  spanTracksSelected.innerText = `(${tracksSelector.value.length})`;
  spanAuthorsSelected.innerText = authorsSelector.value.length
    ? `(${authorsSelector.value.length})`
    : "";
  spanAffiliationsSelected.innerText = affiliationsSelector.value.length
    ? `(${affiliationsSelector.value.length})`
    : "";
}

authorsSelector.addEventListener("input", onUpdateFilters);
affiliationsSelector.addEventListener("input", onUpdateFilters);
tracksSelector.addEventListener("input", onUpdateFilters);

const paperSelectionCount = document.getElementById("paperSelectionCount");
const myPapers = await notebook.value("myPapers");

function onMyPapersChange() {
  console.log("onMyPapersChange", myPapers.value);
  const selected = myPapers.value;
  paperSelectionCount.innerText = `(${selected.length})`;
}
myPapers.addEventListener("input", onMyPapersChange);

onMyPapersChange();

onUpdateFilters();
