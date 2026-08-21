import { unzipSync, strFromU8 } from 'fflate';

const ZIP_MAGIC = [0x50, 0x4b, 0x03, 0x04]; // "PK\x03\x04"

function looksLikeZip(bytes: Uint8Array): boolean {
  return ZIP_MAGIC.every((b, i) => bytes[i] === b);
}

/** Strip a UTF-8/UTF-16 byte order mark, which DOMParser refuses to swallow. */
function stripBom(text: string): string {
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}

/**
 * Pull the score out of a compressed MusicXML container (`.mxl`).
 * The container points at the real score through META-INF/container.xml.
 */
function extractMxl(bytes: Uint8Array): string {
  const files = unzipSync(bytes);
  const names = Object.keys(files);

  const containerName = names.find((n) => n.toLowerCase().endsWith('meta-inf/container.xml'));
  if (containerName) {
    const container = new DOMParser().parseFromString(strFromU8(files[containerName]), 'application/xml');
    for (const rootfile of Array.from(container.getElementsByTagName('rootfile'))) {
      const path = rootfile.getAttribute('full-path');
      if (!path) continue;
      const hit = names.find((n) => n === path) ?? names.find((n) => n.endsWith(path));
      if (hit) return stripBom(strFromU8(files[hit]));
    }
  }

  const fallback = names.find(
    (n) => !n.toLowerCase().startsWith('meta-inf/') && /\.(musicxml|xml)$/i.test(n),
  );
  if (fallback) return stripBom(strFromU8(files[fallback]));

  throw new Error('This .mxl archive does not contain a MusicXML score.');
}

export interface LoadedFile {
  name: string;
  xml: string;
}

export async function readScoreFile(file: File): Promise<LoadedFile> {
  const buffer = new Uint8Array(await file.arrayBuffer());
  const xml = looksLikeZip(buffer) ? extractMxl(buffer) : stripBom(new TextDecoder('utf-8').decode(buffer));
  return { name: file.name, xml };
}

export function baseName(fileName: string): string {
  return fileName.replace(/\.(musicxml|xml|mxl)$/i, '') || 'score';
}
