import { resolve } from "node:path";
import expressGenTs from "./express-scaffolding-typescript.js";

/******************************************************************************
                                 Run
******************************************************************************/

// Init
console.log("Setting up new Express/TypeScript project...");
const args = process.argv.slice(2);

// Setup use yarn
let useYarn = false;
const useYarnIdx = args.indexOf("--use-yarn");
if (useYarnIdx > -1) {
  useYarn = true;
  args.splice(useYarnIdx, 1);
}

// Setup destination
let destination = "express-scaffolding-ts";
if (args.length > 0) {
  destination = args[0];
}
destination = resolve(process.cwd(), destination);

// Creating new project finished
expressGenTs(destination, useYarn)
  .then(() => {
    console.log("Project setup complete!");
  })
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
