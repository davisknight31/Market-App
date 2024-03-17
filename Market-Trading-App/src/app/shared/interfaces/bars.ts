export interface Bars {
  bars: { [key: string]: Bar };
}

interface Bar {
  c: number; // Close
  h: number; // High
  l: number; // Low
  n: number; // Count
  o: number; // Open
  t: Date; // Time
  v: number; // Volume
  vw: number; // VolumeWeighted
}
