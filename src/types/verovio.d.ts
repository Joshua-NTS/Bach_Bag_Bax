declare module 'verovio/wasm' {
  const createVerovioModule: () => Promise<unknown>;
  export default createVerovioModule;
}

declare module 'verovio/esm' {
  export interface VerovioOptions {
    [key: string]: unknown;
  }

  export class VerovioToolkit {
    constructor(module: unknown);
    getVersion(): string;
    setOptions(options: VerovioOptions): void;
    getOptions(): VerovioOptions;
    resetOptions(): void;
    loadData(data: string): boolean;
    redoLayout(options?: VerovioOptions): void;
    getPageCount(): number;
    renderToSVG(page: number, options?: VerovioOptions): string;
    renderToMIDI(): string;
    renderToTimemap(options?: VerovioOptions): Array<Record<string, unknown>>;
    getLog(): string;
    getMEI(options?: VerovioOptions): string;
    getElementsAtTime(millisec: number): { page: number; notes: string[] };
    destroy(): void;
  }
}
