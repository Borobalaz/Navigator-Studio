export function formatNumberWithDot(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }

  const raw = String(value).trim();
  if (!raw) {
    return '';
  }

  const digitsOnly = raw.replace(/\D/g, '');
  if (!digitsOnly) {
    return raw;
  }

  return Number(digitsOnly).toLocaleString('de-DE');
}
