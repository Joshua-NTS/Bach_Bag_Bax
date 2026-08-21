import { Icon } from './ui';

function clock(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) seconds = 0;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function PlayerBar({
  playing,
  position,
  duration,
  staffLabels,
  mutedStaves,
  followCursor,
  onToggleFollow,
  onPlayPause,
  onStop,
  onSeek,
  onToggleMute,
}: {
  playing: boolean;
  position: number;
  duration: number;
  staffLabels: string[];
  mutedStaves: boolean[];
  followCursor: boolean;
  onToggleFollow: () => void;
  onPlayPause: () => void;
  onStop: () => void;
  onSeek: (seconds: number) => void;
  onToggleMute: (staff: number) => void;
}) {
  return (
    <div className="player">
      <button
        type="button"
        className="btn icon primary"
        onClick={onPlayPause}
        title={playing ? 'Pause' : 'Play'}
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {playing ? <Icon.Pause /> : <Icon.Play />}
      </button>
      <button type="button" className="btn icon ghost" onClick={onStop} title="Stop" aria-label="Stop">
        <Icon.Stop />
      </button>

      <span className="player-time">{clock(position)}</span>
      <input
        className="player-scrub"
        type="range"
        min={0}
        max={Math.max(0.1, duration)}
        step={0.05}
        value={Math.min(position, duration)}
        onChange={(e) => onSeek(Number(e.target.value))}
        aria-label="Playback position"
      />
      <span className="player-time">{clock(duration)}</span>

      <div className="sep" />

      <div className="mute-group">
        {staffLabels.map((label, i) => (
          <button
            key={i}
            type="button"
            className="mute-btn"
            data-muted={mutedStaves[i] === true}
            onClick={() => onToggleMute(i)}
            title={`${mutedStaves[i] ? 'Unmute' : 'Mute'} ${label}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="sep" />

      <button
        type="button"
        className="mute-btn"
        data-muted={!followCursor}
        onClick={onToggleFollow}
        title="Scroll the preview to follow playback"
      >
        Follow
      </button>
    </div>
  );
}
