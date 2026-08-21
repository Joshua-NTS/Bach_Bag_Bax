import { useEffect, useLayoutEffect, useRef } from 'react';
import { type PageGeometry } from '../core/paper';

interface Props {
  pages: string[];
  geometry: PageGeometry;
  zoom: number;
  showGuides: boolean;
  /** Source measure index to light up while playing, or null. */
  activeMeasure: number | null;
  followCursor: boolean;
}

export function ScorePreview({ pages, geometry, zoom, showGuides, activeMeasure, followCursor }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const measuresRef = useRef<Element[]>([]);
  const lastActive = useRef<Element | null>(null);

  // Verovio emits measures in score order, so the nth <g class="measure">
  // across all pages is the nth measure of the piece.
  useLayoutEffect(() => {
    measuresRef.current = rootRef.current ? Array.from(rootRef.current.querySelectorAll('g.measure')) : [];
    lastActive.current = null;
  }, [pages]);

  useEffect(() => {
    const previous = lastActive.current;
    if (previous) previous.classList.remove('is-playing');
    lastActive.current = null;
    if (activeMeasure === null) return;

    const target = measuresRef.current[activeMeasure];
    if (!target) return;
    target.classList.add('is-playing');
    lastActive.current = target;

    if (!followCursor) return;
    const scroller = rootRef.current?.closest('.preview-scroll');
    if (!scroller) return;
    const noteBox = (target as SVGGraphicsElement).getBoundingClientRect();
    const scrollBox = scroller.getBoundingClientRect();
    const outOfView = noteBox.bottom > scrollBox.bottom - 24 || noteBox.top < scrollBox.top + 24;
    if (outOfView) {
      scroller.scrollTo({
        top: scroller.scrollTop + (noteBox.top - scrollBox.top) - scrollBox.height * 0.35,
        behavior: 'smooth',
      });
    }
  }, [activeMeasure, followCursor, pages]);

  return (
    <div
      ref={rootRef}
      className="pages"
      style={
        {
          '--pw': geometry.pageWidth,
          '--ph': geometry.pageHeight,
          '--mt': geometry.margins.top,
          '--mr': geometry.margins.right,
          '--mb': geometry.margins.bottom,
          '--ml': geometry.margins.left,
          '--z': zoom,
        } as React.CSSProperties
      }
    >
      {pages.map((svg, index) => (
        <div key={index} className={`page${showGuides ? ' margin-guides' : ''}`}>
          <div className="page-inner" dangerouslySetInnerHTML={{ __html: svg }} />
          <span className="page-number">
            {index + 1} / {pages.length}
          </span>
        </div>
      ))}
    </div>
  );
}
