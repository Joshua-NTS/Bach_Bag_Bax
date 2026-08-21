import { type RenderedNote } from './midi';

/**
 * A small WebAudio synth so the preview can be heard without leaving the page.
 * Two staves, two timbres, panned apart so the lines stay distinguishable.
 */
export class ScorePlayer {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private scheduled: Array<{ stop: () => void }> = [];
  private notes: RenderedNote[] = [];
  private startedAt = 0;
  private offset = 0;
  private raf = 0;
  private mutedStaves = new Set<number>();

  playing = false;
  duration = 0;
  onTick: ((seconds: number) => void) | null = null;
  onEnd: (() => void) | null = null;

  setNotes(notes: RenderedNote[], duration: number) {
    const wasPlaying = this.playing;
    this.stop();
    this.notes = notes;
    this.duration = duration;
    if (wasPlaying) this.offset = 0;
  }

  setStaffMuted(staff: number, muted: boolean) {
    if (muted) this.mutedStaves.add(staff);
    else this.mutedStaves.delete(staff);
    if (this.playing) {
      const at = this.position();
      this.play(at);
    }
  }

  isStaffMuted(staff: number) {
    return this.mutedStaves.has(staff);
  }

  position(): number {
    if (!this.playing || !this.ctx) return this.offset;
    return this.offset + (this.ctx.currentTime - this.startedAt);
  }

  async play(from?: number) {
    this.stopSources();
    const ctx = this.ensureContext();
    if (ctx.state === 'suspended') await ctx.resume();

    this.offset = Math.max(0, from ?? this.position());
    if (this.offset >= this.duration - 0.01) this.offset = 0;
    this.startedAt = ctx.currentTime;
    this.playing = true;

    const base = ctx.currentTime - this.offset + 0.06;
    for (const note of this.notes) {
      if (note.time + note.duration < this.offset) continue;
      if (this.mutedStaves.has(note.staff)) continue;
      this.scheduleNote(ctx, note, base);
    }
    this.tick();
  }

  pause() {
    if (!this.playing) return;
    this.offset = this.position();
    this.playing = false;
    this.stopSources();
    cancelAnimationFrame(this.raf);
  }

  stop() {
    this.playing = false;
    this.offset = 0;
    this.stopSources();
    cancelAnimationFrame(this.raf);
    this.onTick?.(0);
  }

  seek(seconds: number) {
    const target = Math.max(0, Math.min(this.duration, seconds));
    if (this.playing) void this.play(target);
    else {
      this.offset = target;
      this.onTick?.(target);
    }
  }

  dispose() {
    this.stop();
    void this.ctx?.close();
    this.ctx = null;
    this.master = null;
  }

  /* ---------------------------------------------------------------- */

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.32;
      this.master.connect(this.ctx.destination);
    }
    return this.ctx;
  }

  private scheduleNote(ctx: AudioContext, note: RenderedNote, base: number) {
    const start = Math.max(ctx.currentTime, base + note.time);
    const end = base + note.time + note.duration;
    if (end <= ctx.currentTime) return;

    const freq = 440 * Math.pow(2, (note.midi - 69) / 12);
    const gain = ctx.createGain();
    const pan = ctx.createStereoPanner();
    pan.pan.value = note.staff === 0 ? -0.22 : 0.22;

    const attack = 0.02;
    const release = 0.14;
    const peak = note.staff === 0 ? 0.3 : 0.26;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(peak, start + attack);
    gain.gain.setValueAtTime(peak * 0.85, Math.max(start + attack, end - release));
    gain.gain.linearRampToValueAtTime(0.0001, end + release);

    const osc = ctx.createOscillator();
    osc.type = note.staff === 0 ? 'triangle' : 'sawtooth';
    osc.frequency.value = freq;

    const colour = ctx.createBiquadFilter();
    colour.type = 'lowpass';
    colour.frequency.value = note.staff === 0 ? 2600 : 1500;
    colour.Q.value = 0.6;

    osc.connect(colour);
    colour.connect(gain);
    gain.connect(pan);
    pan.connect(this.master!);

    osc.start(start);
    osc.stop(end + release + 0.05);
    const entry = {
      stop: () => {
        try {
          osc.stop();
        } catch {
          /* already stopped */
        }
        osc.disconnect();
        gain.disconnect();
        pan.disconnect();
      },
    };
    this.scheduled.push(entry);
    osc.onended = () => {
      const i = this.scheduled.indexOf(entry);
      if (i >= 0) this.scheduled.splice(i, 1);
    };
  }

  private stopSources() {
    for (const s of this.scheduled.slice()) s.stop();
    this.scheduled = [];
  }

  private tick = () => {
    if (!this.playing) return;
    const at = this.position();
    this.onTick?.(at);
    if (at >= this.duration) {
      this.playing = false;
      this.offset = 0;
      this.stopSources();
      this.onEnd?.();
      return;
    }
    this.raf = requestAnimationFrame(this.tick);
  };
}
