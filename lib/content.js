import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";

const DEFAULT_CONTENT_PATH = path.join(process.cwd(), "content", "default-content.json");
const RUNTIME_CONTENT_PATH =
  process.env.CONTENT_PATH || path.join(process.cwd(), "data", "content.json");

function readDefaultContent() {
  return JSON.parse(fs.readFileSync(DEFAULT_CONTENT_PATH, "utf-8"));
}

export async function getContent() {
  try {
    const raw = await fsp.readFile(RUNTIME_CONTENT_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
    const defaults = readDefaultContent();
    await saveContent(defaults);
    return defaults;
  }
}

export async function saveContent(data) {
  await fsp.mkdir(path.dirname(RUNTIME_CONTENT_PATH), { recursive: true });
  await fsp.writeFile(RUNTIME_CONTENT_PATH, JSON.stringify(data, null, 2), "utf-8");
}
