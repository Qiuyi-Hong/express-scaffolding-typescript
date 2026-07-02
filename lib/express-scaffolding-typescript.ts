import { existsSync } from "node:fs";
import { rename } from "node:fs/promises";
import { execSync } from "node:child_process";
import { basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import editJsonFile from "edit-json-file";
import ncpPackage from "ncp";

/******************************************************************************
                                 Constants
******************************************************************************/

const MODULE_DIR = dirname(fileURLToPath(import.meta.url));
const PROJECT_FOLDER_PATH = join(MODULE_DIR, "projectFolder");
const { ncp } = ncpPackage;
const EXCLUDED_TEMPLATE_ENTRIES = new Set([
  ".npmignore",
  "node_modules",
  "package-lock.json",
]);

const DEPENDENCIES = ["body-parser", "dotenv", "express", "path", "uuid"];

const DEV_DEPENDENCIES = [
  "@eslint/js",
  "@types/express",
  "@types/node",
  "eslint",
  "eslint-config-prettier",
  "eslint-plugin-prettier",
  "globals",
  "jiti",
  "prettier",
  "tsx",
  "typescript",
  "typescript-eslint",
];

// "ncp" options
const ncpOpts = {
  filter: (fileName: string) => {
    return !relative(PROJECT_FOLDER_PATH, fileName)
      .split(/[\\/]/)
      .some((entry) => EXCLUDED_TEMPLATE_ENTRIES.has(entry));
  },
};

/******************************************************************************
                                 Functions
******************************************************************************/

/**
 * Entry point
 */
async function expressGenTs(destination: string) {
  await copyProjectFiles(destination);
  updatePackageJson(destination);
  await renameGitignoreFile(destination);
  downloadNodeModules(destination);
}

/**
 * Copy project files
 */
function copyProjectFiles(destination: string) {
  const source = PROJECT_FOLDER_PATH;
  return /** @type {Promise<void>} */ new Promise<void>((res, rej) => {
    return ncp(source, destination, ncpOpts, (err) => {
      return err ? rej(err) : res();
    });
  });
}

/**
 * Set update the package.json file.
 */
function updatePackageJson(destination: string) {
  const file = editJsonFile(destination + "/package.json", {
    autosave: true,
  });
  file.set("name", basename(destination));
  file.set("dependencies", {});
  file.set("devDependencies", {});
}

/**
 * Because npm does not allow .gitignore to be published.
 */
async function renameGitignoreFile(destination: string) {
  const source = join(destination, "gitignore");
  if (!existsSync(source)) {
    return;
  }
  await rename(source, join(destination, ".gitignore"));
}

/**
 * Download the dependencies.
 */
function downloadNodeModules(destination: string) {
  const options = { cwd: destination };
  // Setup dependencies string
  const depStr = DEPENDENCIES.join(" ");
  const devDepStr = DEV_DEPENDENCIES.join(" ");
  // Execute command
  execSync("npm i -s " + depStr, options);
  execSync("npm i -D " + devDepStr, options);
}

/******************************************************************************
                                Export
******************************************************************************/

export default expressGenTs;
