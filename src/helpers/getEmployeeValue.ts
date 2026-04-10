import type { MunkavallaloRecord } from '../db';

export function getEmployeeValue(employee: MunkavallaloRecord, keys: string[]): string {
  const row = employee as unknown as Record<string, unknown>;

  for (const key of keys) {
    const value = row[key];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return '';
}
