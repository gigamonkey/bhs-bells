import polyfill from 'temporal-polyfill';

declare global {
  interface Date {
    toTemporalInstant: typeof polyfill.toTemporalInstant;
  }
}

Date.prototype.toTemporalInstant = polyfill.toTemporalInstant;
