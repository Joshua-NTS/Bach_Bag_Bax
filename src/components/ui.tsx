import { useId, useState, type ReactNode } from 'react';

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

type IconProps = { className?: string };

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  width: 16,
  height: 16,
  'aria-hidden': true,
};

export const Icon = {
  Chevron: ({ className }: IconProps) => (
    <svg {...svgProps} className={className}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  Print: () => (
    <svg {...svgProps}>
      <path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
      <path d="M6 14h12v7H6z" />
    </svg>
  ),
  Download: () => (
    <svg {...svgProps}>
      <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
      <path d="M3 17v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2" />
    </svg>
  ),
  Play: () => (
    <svg {...svgProps} fill="currentColor" stroke="none">
      <path d="M7 4.5v15l12-7.5z" />
    </svg>
  ),
  Pause: () => (
    <svg {...svgProps} fill="currentColor" stroke="none">
      <path d="M7 4h3.5v16H7zM13.5 4H17v16h-3.5z" />
    </svg>
  ),
  Stop: () => (
    <svg {...svgProps} fill="currentColor" stroke="none">
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
    </svg>
  ),
  Plus: () => (
    <svg {...svgProps}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Minus: () => (
    <svg {...svgProps}>
      <path d="M5 12h14" />
    </svg>
  ),
  Sun: () => (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  Moon: () => (
    <svg {...svgProps}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  ),
  File: () => (
    <svg {...svgProps}>
      <path d="M14 3v5h5" />
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2z" />
    </svg>
  ),
  Close: () => (
    <svg {...svgProps}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  Reset: () => (
    <svg {...svgProps}>
      <path d="M3 12a9 9 0 1 0 2.6-6.4M3 4v5h5" />
    </svg>
  ),
  Music: () => (
    <svg {...svgProps}>
      <path d="M9 18V5l11-2v13" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="17.5" cy="16" r="2.5" />
    </svg>
  ),
};

/* ------------------------------------------------------------------ */
/* Layout primitives                                                   */
/* ------------------------------------------------------------------ */

export function Panel({
  title,
  badge,
  defaultOpen = true,
  children,
}: {
  title: string;
  badge?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="panel" data-open={open}>
      <button type="button" className="panel-head" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <Icon.Chevron className="chevron" />
        <h3>{title}</h3>
        {badge !== undefined && badge !== null && <span className="panel-badge">{badge}</span>}
      </button>
      {open && <div className="panel-body">{children}</div>}
    </section>
  );
}

export function Field({
  label,
  value,
  hint,
  children,
}: {
  label: string;
  value?: ReactNode;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="field">
      <div className="field-label">
        <span>{label}</span>
        {value !== undefined && <span className="field-value">{value}</span>}
      </div>
      {children}
      {hint && <div className="field-hint">{hint}</div>}
    </div>
  );
}

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  suffix = '',
  hint,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  hint?: ReactNode;
  format?: (v: number) => string;
  onChange: (value: number) => void;
}) {
  return (
    <Field label={label} value={`${format ? format(value) : value}${suffix}`} hint={hint}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
      />
    </Field>
  );
}

export function Segmented<T extends string>({
  label,
  value,
  options,
  hint,
  onChange,
}: {
  label?: string;
  value: T;
  options: Array<{ value: T; label: string; title?: string }>;
  hint?: ReactNode;
  onChange: (value: T) => void;
}) {
  const body = (
    <div className="segmented" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          title={o.title}
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
  if (!label) return body;
  return (
    <Field label={label} hint={hint}>
      {body}
    </Field>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="switch">
      <span className="switch-label">{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="switch-track" />
    </label>
  );
}

export function Select<T extends string>({
  label,
  value,
  options,
  hint,
  disabled,
  title,
  onChange,
}: {
  label?: string;
  value: T;
  options: Array<{ value: T; label: string }>;
  hint?: ReactNode;
  disabled?: boolean;
  title?: string;
  onChange: (value: T) => void;
}) {
  const id = useId();
  const select = (
    <select
      id={id}
      value={value}
      disabled={disabled}
      title={title}
      onChange={(e) => onChange(e.target.value as T)}
      aria-label={label}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
  if (!label) return select;
  return (
    <Field label={label} hint={hint}>
      {select}
    </Field>
  );
}

export function NumberInput({
  label,
  value,
  min,
  max,
  step = 1,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <Field label={label} value={suffix}>
      <input
        type="number"
        value={Number.isFinite(value) ? value : ''}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          const next = Number(e.target.value);
          if (Number.isFinite(next)) onChange(Math.min(max, Math.max(min, next)));
        }}
        aria-label={label}
      />
    </Field>
  );
}

export function Notice({
  kind = 'info',
  icon,
  children,
}: {
  kind?: 'info' | 'warn' | 'error';
  icon?: string;
  children: ReactNode;
}) {
  return (
    <div className={`notice ${kind}`}>
      <span className="notice-icon">{icon ?? (kind === 'error' ? '!' : kind === 'warn' ? '!' : 'i')}</span>
      <div>{children}</div>
    </div>
  );
}
