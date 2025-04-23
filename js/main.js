import { renderCellIfelementExists, loadHTMLInto } from "./utils.js";

import {
  Runtime,
  Inspector,
} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@5/dist/runtime.js";

// 4368 version May 28
import define from "https://api.observablehq.com/@john-guerra/chi2025-papers@latest.js?v=4";

export const notebook = new Runtime().module(define, (name) => {
  const cells = [
    "viewof facetedSelectedPhase1",
    "viewof typesSelected",
    "viewof restartDR",
    "viewof useCachedDR",
    "viewof druid_method2",
    "viewof druid_params2",
    "viewof colorBy",
    "viewof colorScheme",
    "viewof interactive",
    "viewof liveSearch",
    "viewof query",
    "viewof drSelection",
    "viewof computeEmbeddings",
    "viewof computeEmbeddingsUsing",
    "viewof restart",
    "viewof embeddings_computed",
    "viewof maxPapersSpinner",
    "selectedPapers",
    "viewof affiliationsSelected",
    "viewof authorsSelected",
    "viewof embeddingsFileSelected",
    "toAttend",
    "viewof computeClusters",
    "viewof maxClusters",
    "clusterHDBScanChart",
    "viewof papersPerClusterRange",
    "hdbscanClustersList",
    "clusteredTreeViz",
    "downloadPlottedData",
    "viewof computeClustersHDBScan",
    "viewof includeKeywords",
    "viewof clusteringType",
    "viewof clusteringSpace",
    "clusteringOptions",
    "viewof keywordsSelected",
    // Without element
    "facetedSelected",
    "reducerResultComputed",
    "reducerResult",
    "sample",
    "dataToPlot",
    "semanticSearchResults",
    "papersHighlighted",
    "vegaScatterPlot",
    "embeddings",
    "embeddingsHash",
    "clusters",
    "cosineSimilarity",
    "clusterPapers",
    "embeddingAccessor",
    "setupOnClick",
    "onClustersChangeColor",
    "hdbscanClusters",
    "papers",
    "viewof tracksSelected",

  ];
  if (cells.includes(name)) return renderCellIfelementExists(name);
});

window.addEventListener("resize", () => {
  console.log("resize", document.getElementById("mainSection").offsetWidth);
  notebook.redefine(
    "width",
    document.getElementById("mainSection").offsetWidth
  );
});
notebook.redefine("width", document.getElementById("mainSection").offsetWidth);

async function query(q) {
  const viewofQuery = await notebook.value("viewof query");
  console.log("Query ", q, viewofQuery);
  viewofQuery.value = q;
  viewofQuery.dispatchEvent(new Event("input"), { bubbles: true });

  notebook.value("facetedSelected").then(async (facetedSelected) => {
    const papers = await notebook.value("papers");
    console.log("🐱 facetedSelected", facetedSelected.length, papers.length);
    document.getElementById(
      "numPapers"
    ).innerText = `${facetedSelected.length}/${papers.length}`;
  });
  // const inp = document.querySelector(
  //   "#observablehq-viewof-query-702d78f5 input"
  // );
  // inp.value = q;
  // inp.dispatchEvent(new Event("input"), { bubbles: true });
}

document.querySelectorAll(".changeQuery").forEach((el) => {
  el.addEventListener("click", (e) => {
    query(e.target.innerText);
  });
});

async function hideShowClusterSection() {
  const viewofComputeClusters = await notebook.value("viewof computeClusters");

  function onComputeClustersChange() {
    {
      const clusterSection = document.getElementById("clustersSection");
      if (viewofComputeClusters.value) {
        clusterSection.style.display = "block";
      } else {
        clusterSection.style.display = "none";
      }
    }
  }
  viewofComputeClusters.addEventListener("input", onComputeClustersChange);

  onComputeClustersChange();
}

window.addEventListener("load", async () => {
  console.log("url", window.location.pathname.split("/").at(-1));
  if (window.location.pathname.split("/").at(-1).includes("clusters")) {
    let viewofUseCachedDR = await notebook.value("viewof useCachedDR");
    viewofUseCachedDR.value = false;
    viewofUseCachedDR.dispatchEvent(new Event("input"), { bubbles: true });

    const viewofComputeClusters = await notebook.value(
      "viewof computeClusters"
    );
    viewofComputeClusters.value = true;
    viewofComputeClusters.dispatchEvent(new Event("input"), { bubbles: true });

    query("");

    console.log(
      "Clusters page, setting up",
      "viewofUseCachedDR.value",
      viewofUseCachedDR.value,
      viewofUseCachedDR,
      "viewofComputeClusters.value",
      viewofComputeClusters.value,
      notebook
    );
  } else {
    hideShowClusterSection();
  }
});

loadHTMLInto("navigation.html", document.getElementById("navigation"));
loadHTMLInto("footer.html", document.getElementById("footer"));
