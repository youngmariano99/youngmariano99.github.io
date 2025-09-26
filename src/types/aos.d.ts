declare module 'aos' {
  interface AosOptions {
    duration?: number;
    easing?: string;
    once?: boolean;
    offset?: number;
    delay?: number;
    disable?: string;
  }

  interface AosInstance {
    init(options?: AosOptions): void;
    refresh(): void;
    refreshHard(): void;
  }

  const AOS: AosInstance;
  export default AOS;
}

declare global {
  interface Window {
    AOS_INITIALIZED?: boolean;
  }
}
