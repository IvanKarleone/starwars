export function extractIdFromUrl(url: string): string {
  const regExpResult = url.match(/\/[0-9]+\/$/);
  return regExpResult ? regExpResult[0].slice(1, -1) : '';
}
