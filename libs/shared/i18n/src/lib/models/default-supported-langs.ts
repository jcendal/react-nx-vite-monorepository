export type DefaultSupportedLangs = 'kr';
export const DefaultSupportedLangs = {
  kr: 'kr' as DefaultSupportedLangs,
};

export function getDefaultSupportedLangs(): DefaultSupportedLangs[] {
  return Object.values(DefaultSupportedLangs);
}
