export type PaperId = 'A3' | 'A4' | 'A5' | 'A6' | 'B4' | 'B5' | 'letter' | 'legal' | 'tabloid' | 'custom';

export interface PaperDef {
  id: PaperId;
  label: string;
  /** Portrait dimensions in millimetres. */
  width: number;
  height: number;
}

export const PAPERS: PaperDef[] = [
  { id: 'A3', label: 'A3', width: 297, height: 420 },
  { id: 'A4', label: 'A4', width: 210, height: 297 },
  { id: 'A5', label: 'A5', width: 148, height: 210 },
  { id: 'A6', label: 'A6', width: 105, height: 148 },
  { id: 'B4', label: 'B4', width: 250, height: 353 },
  { id: 'B5', label: 'B5', width: 176, height: 250 },
  { id: 'letter', label: 'Letter', width: 215.9, height: 279.4 },
  { id: 'legal', label: 'Legal', width: 215.9, height: 355.6 },
  { id: 'tabloid', label: 'Tabloid', width: 279.4, height: 431.8 },
  { id: 'custom', label: 'Custom', width: 210, height: 297 },
];

export type Orientation = 'portrait' | 'landscape';
export type BreakMode = 'auto' | 'encoded' | 'smart';

export interface Margins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface LayoutSettings {
  paper: PaperId;
  customWidth: number;
  customHeight: number;
  orientation: Orientation;
  margins: Margins;
  /** Music size as a percentage. Acts as the "font size" of the score. */
  scale: number;
  /** Gap between the two staves of a system, in staff spaces. */
  staffGap: number;
  /** Gap between systems on the page, in staff spaces. */
  systemGap: number;
  /** Horizontal note spacing, 0.05 (tight) to 1 (airy). */
  noteSpacing: number;
  lyricSize: number;
  justifyVertically: boolean;
  breaks: BreakMode;
  font: string;
  showHeader: boolean;
  showFooter: boolean;
  staffLineWidth: number;
}

export const MUSIC_FONTS = ['Leipzig', 'Bravura', 'Leland', 'Gootville', 'Petaluma'];

export const DEFAULT_LAYOUT: LayoutSettings = {
  paper: 'A4',
  customWidth: 210,
  customHeight: 297,
  orientation: 'portrait',
  margins: { top: 15, right: 12, bottom: 15, left: 12 },
  scale: 100,
  staffGap: 12,
  systemGap: 8,
  noteSpacing: 0.25,
  lyricSize: 4.5,
  justifyVertically: false,
  breaks: 'auto',
  font: 'Leipzig',
  showHeader: true,
  showFooter: false,
  staffLineWidth: 0.15,
};

export interface PageGeometry {
  /** Physical sheet, in millimetres. */
  pageWidth: number;
  pageHeight: number;
  /** The area the music is drawn into, in millimetres. */
  contentWidth: number;
  contentHeight: number;
  margins: Margins;
}

export function geometryFor(layout: LayoutSettings): PageGeometry {
  const def = PAPERS.find((p) => p.id === layout.paper) ?? PAPERS[1];
  const baseW = layout.paper === 'custom' ? layout.customWidth : def.width;
  const baseH = layout.paper === 'custom' ? layout.customHeight : def.height;
  const portrait = layout.orientation === 'portrait';
  const pageWidth = clamp(portrait ? baseW : baseH, 40, 1000);
  const pageHeight = clamp(portrait ? baseH : baseW, 40, 1000);

  // Never let the margins eat the whole sheet.
  const maxSide = pageWidth * 0.45;
  const maxEnd = pageHeight * 0.45;
  const margins: Margins = {
    top: clamp(layout.margins.top, 0, maxEnd),
    right: clamp(layout.margins.right, 0, maxSide),
    bottom: clamp(layout.margins.bottom, 0, maxEnd),
    left: clamp(layout.margins.left, 0, maxSide),
  };

  return {
    pageWidth,
    pageHeight,
    contentWidth: pageWidth - margins.left - margins.right,
    contentHeight: pageHeight - margins.top - margins.bottom,
    margins,
  };
}

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

/**
 * Turn the layout into Verovio options.
 *
 * Verovio's `scale` shrinks the whole page, so to make it behave like a font
 * size we hand it a page measured in *music* units — `100 / scale` times the
 * physical one. The rendered SVG then always comes out at the true paper size
 * while the notes get bigger or smaller inside it.
 *
 * Margins are left to CSS instead: Verovio is given the content box only, so
 * the printed margin is exact and is not capped by Verovio's own limits.
 */
export function verovioOptions(layout: LayoutSettings, geo: PageGeometry): Record<string, unknown> {
  const scale = clamp(layout.scale, 20, 400);
  const k = 100 / scale;
  const toUnits = (mm: number) => Math.round(mm * 10 * k);

  return {
    scale,
    pageWidth: Math.max(100, toUnits(geo.contentWidth)),
    pageHeight: Math.max(100, toUnits(geo.contentHeight)),
    pageMarginTop: 0,
    pageMarginBottom: 0,
    pageMarginLeft: 0,
    pageMarginRight: 0,
    adjustPageHeight: false,
    adjustPageWidth: false,
    mmOutput: true,
    svgViewBox: true,
    svgHtml5: false,
    svgRemoveXlink: true,
    footer: layout.showFooter ? 'auto' : 'none',
    header: layout.showHeader ? 'auto' : 'none',
    breaks: layout.breaks,
    font: layout.font,
    spacingStaff: clamp(layout.staffGap, 0, 48),
    spacingSystem: clamp(layout.systemGap, 0, 48),
    spacingLinear: clamp(layout.noteSpacing, 0.02, 1),
    spacingNonLinear: 0.6,
    lyricSize: clamp(layout.lyricSize, 2, 8),
    justifyVertically: layout.justifyVertically,
    staffLineWidth: clamp(layout.staffLineWidth, 0.1, 0.3),
    minLastJustification: 0.6,
    condense: 'none',
  };
}
