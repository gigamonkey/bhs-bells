import { toTemporalInstant } from 'temporal-polyfill';

declare global {
  interface Date {
    toTemporalInstant: typeof toTemporalInstant;
  }
}

Date.prototype.toTemporalInstant = toTemporalInstant;
