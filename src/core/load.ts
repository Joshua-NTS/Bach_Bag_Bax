import { type ParsedScore } from './types';
import { looksLikeZip, extractMxl, stripBom } from './mxl';
import { parseMusicXml } from './musicxml';
import { isMidiFile, parseMidiScore, type MidiImportOptions } from './midifile';

/**
 * What was dropped on the page, kept in its original form. MIDI is re-read
 * whenever the import settings change, so the bytes have to stay around.
 */
export type ScoreSource =
  | { kind: 'musicxml'; name: string; xml: string }
  | { kind: 'midi'; name: string; bytes: Uint8Array };

export const ACCEPTED_EXTENSIONS = ['.musicxml', '.xml', '.mxl', '.mid', '.midi', '.kar'];

export function looksLikeScoreFile(name: string): boolean {
  return ACCEPTED_EXTENSIONS.some((ext) => name.toLowerCase().endsWith(ext));
}

/** Decide what a file is by looking at it, not by trusting its extension. */
export async function readSource(file: File): Promise<ScoreSource> {
  const bytes = new Uint8Array(await file.arrayBuffer());

  if (isMidiFile(bytes)) return { kind: 'midi', name: file.name, bytes };
  if (looksLikeZip(bytes)) return { kind: 'musicxml', name: file.name, xml: extractMxl(bytes) };

  const text = stripBom(new TextDecoder('utf-8').decode(bytes));
  if (/^\s*(<\?xml|<!DOCTYPE|<score-)/.test(text.slice(0, 200))) {
    return { kind: 'musicxml', name: file.name, xml: text };
  }
  throw new Error(
    `"${file.name}" is neither MusicXML nor a MIDI file. ` +
      'Export the piece as .musicxml, .mxl or .mid and try again.',
  );
}

export function parseSource(source: ScoreSource, midiOptions: MidiImportOptions): ParsedScore {
  return source.kind === 'midi'
    ? parseMidiScore(source.bytes, midiOptions)
    : parseMusicXml(source.xml);
}
