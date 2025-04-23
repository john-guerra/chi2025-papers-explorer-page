import { notebook } from "./main.js";

async function main() {
  console.log("🐱 redefine height");
  notebook.redefine("height", window.innerHeight*0.2);
  const maxR = await notebook.value("viewof maxR");
  maxR.value = 50;
  maxR.dispatchEvent(new Event("input"), { bubbles: true });
}

main();