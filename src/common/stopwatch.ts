export class Stopwatch {
  private readonly started: [number, number];

  constructor() {
    this.started = process.hrtime();
  }

  /**
   * get the elapsed time in milliseconds
   */
  getElapsedMs() {
    const [seconds, nanoseconds] = process.hrtime(this.started);

    return Math.ceil(seconds * 1e3 + nanoseconds / 1e6);
  }

  /**
   * get the elapsed time in seconds
   */
  getElapsedSeconds() {
    const [seconds] = process.hrtime(this.started);

    return seconds;
  }
}
