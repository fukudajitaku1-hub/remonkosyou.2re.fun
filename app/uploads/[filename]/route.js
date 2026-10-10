import fs from "node:fs/promises";
import path from "node:path";
import { uploadsDir } from "../../../lib/uploads";

export const dynamic = "force-dynamic";

const CONTENT_TYPE_BY_EXT = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export async function GET(request, { params }) {
  const filename = params.filename;
  const contentType = filename ? CONTENT_TYPE_BY_EXT[path.extname(filename).toLowerCase()] : null;

  if (!filename || filename.includes("/") || filename.includes("..") || !contentType) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const data = await fs.readFile(path.join(uploadsDir(), filename));
    return new Response(data, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
