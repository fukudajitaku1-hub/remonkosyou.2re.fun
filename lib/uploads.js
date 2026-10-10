import crypto from "node:crypto";
import fsp from "node:fs/promises";
import path from "node:path";

const RUNTIME_CONTENT_PATH =
  process.env.CONTENT_PATH || path.join(process.cwd(), "data", "content.json");
const UPLOADS_DIR = path.join(path.dirname(RUNTIME_CONTENT_PATH), "uploads");

const EXTENSION_BY_MIME = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export function uploadsDir() {
  return UPLOADS_DIR;
}

export async function saveUploadedImage(file) {
  if (!file || typeof file.arrayBuffer !== "function" || file.size === 0) {
    return null;
  }
  const ext = EXTENSION_BY_MIME[file.type];
  if (!ext) {
    throw new Error(`サポートしていない画像形式です: ${file.type}`);
  }

  await fsp.mkdir(UPLOADS_DIR, { recursive: true });
  const filename = `${crypto.randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fsp.writeFile(path.join(UPLOADS_DIR, filename), buffer);
  return `/uploads/${filename}`;
}
