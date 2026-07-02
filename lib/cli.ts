import { resolve } from "node:path";
import expressGenTs from "./express-scaffolding-typescript.ts";

/******************************************************************************
                                 Run
******************************************************************************/

// Init
console.log(`
───────────────────────────────────────────────────────────
        🚀     express-scaffolding-typescript     🚀
        Scaffold the Express.js backend application
───────────────────────────────────────────────────────────
Setting up the new Express project with TypeScript...
`);
const args = process.argv.slice(2);

// Setup destination
let destination = "express-scaffolding-ts";
if (args.length > 0 && args[0]) {
  destination = args[0];
}
destination = resolve(process.cwd(), destination);

// Creating new project finished
expressGenTs(destination)
  .then(() => {
    console.log(`✔️ Success! Your project setup is ready at: ${destination}`);
  })
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
