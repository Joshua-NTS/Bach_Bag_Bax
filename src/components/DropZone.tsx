import { useEffect, useRef, useState } from 'react';
import { Icon } from './ui';

const ACCEPT = '.xml,.musicxml,.mxl,.mid,.midi,.kar,application/xml,text/xml,audio/midi';

function pickScoreFile(list: FileList | null | undefined): File | null {
  if (!list || list.length === 0) return null;
  const files = Array.from(list);
  return files.find((f) => /\.(musicxml|mxl|xml|midi?|kar)$/i.test(f.name)) ?? files[0];
}

/** Full-window drag target, so a file can be dropped anywhere on the page. */
export function useWindowDrop(onFile: (file: File) => void) {
  const [dragging, setDragging] = useState(false);
  const depth = useRef(0);

  useEffect(() => {
    const enter = (e: DragEvent) => {
      if (!e.dataTransfer?.types.includes('Files')) return;
      depth.current++;
      setDragging(true);
    };
    const leave = () => {
      depth.current = Math.max(0, depth.current - 1);
      if (depth.current === 0) setDragging(false);
    };
    const over = (e: DragEvent) => {
      if (e.dataTransfer?.types.includes('Files')) e.preventDefault();
    };
    const drop = (e: DragEvent) => {
      if (!e.dataTransfer?.types.includes('Files')) return;
      e.preventDefault();
      depth.current = 0;
      setDragging(false);
      const file = pickScoreFile(e.dataTransfer.files);
      if (file) onFile(file);
    };

    window.addEventListener('dragenter', enter);
    window.addEventListener('dragleave', leave);
    window.addEventListener('dragover', over);
    window.addEventListener('drop', drop);
    return () => {
      window.removeEventListener('dragenter', enter);
      window.removeEventListener('dragleave', leave);
      window.removeEventListener('dragover', over);
      window.removeEventListener('drop', drop);
    };
  }, [onFile]);

  return dragging;
}

export function DropZone({
  onFile,
  onSample,
  busy,
}: {
  onFile: (file: File) => void;
  onSample: () => void;
  busy: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="dropzone">
      <div className="dropzone-inner">
        <div className="dropzone-icon">
          <Icon.Music />
        </div>
        <div>
          <h2>Drop a four-voice score</h2>
          <p>
            MusicXML or MIDI. Soprano, alto, tenor and bass go in; a printable two-staff score and a
            two-track MIDI file come out. Everything happens in your browser: nothing is uploaded.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button type="button" className="btn primary" disabled={busy} onClick={() => inputRef.current?.click()}>
            {busy ? 'Reading…' : 'Choose a file'}
          </button>
          <button type="button" className="btn" disabled={busy} onClick={onSample}>
            Load a sample
          </button>
        </div>
        <div className="dropzone-formats">
          <span className="tag">.musicxml</span>
          <span className="tag">.xml</span>
          <span className="tag">.mxl</span>
          <span className="tag">.mid</span>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="sr-only"
        onChange={(e) => {
          const file = pickScoreFile(e.target.files);
          if (file) onFile(file);
          e.target.value = '';
        }}
      />
    </div>
  );
}
