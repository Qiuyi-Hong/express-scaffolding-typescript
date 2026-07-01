import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");

function run(command, args, options = {}) {
  return spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 10,
    timeout: 180000,
    ...options,
  });
}

function outputFor(result) {
  return [result.stdout, result.stderr].filter(Boolean).join("\n");
}

test("published bin scaffolds an installable Express TypeScript project", () => {
  const tempDir = mkdtempSync(
    join(tmpdir(), "express-scaffolding-typescript-"),
  );
  const projectDir = join(tempDir, "smoke-app");

  try {
    const packResult = run("npm", [
      "pack",
      "--silent",
      "--pack-destination",
      tempDir,
    ]);
    assert.equal(packResult.status, 0, outputFor(packResult));

    const tarballName = packResult.stdout.trim().split("\n").at(-1);
    const tarballPath = join(tempDir, tarballName);

    const execResult = run(
      "npm",
      [
        "exec",
        "--yes",
        "--package",
        tarballPath,
        "--",
        "express-scaffolding-typescript",
        projectDir,
      ],
      { cwd: tempDir },
    );
    assert.equal(execResult.status, 0, outputFor(execResult));

    assert.ok(existsSync(join(projectDir, "src", "server.ts")));
    assert.ok(existsSync(join(projectDir, ".env")));
    assert.ok(existsSync(join(projectDir, "node_modules", "express")));

    const packageJson = JSON.parse(
      readFileSync(join(projectDir, "package.json"), "utf8"),
    );
    assert.equal(packageJson.name, basename(projectDir));
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
});
