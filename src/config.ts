const throwConfigError = (key: string) => {
  throw new Error(`Missing environment variable: ${key}.`);
};

// Note that including an API key in an app is not very secure, as the app can be
// decompiled to access it. It's fine for this training exercise though.
const apiKey = process.env.API_KEY ?? throwConfigError('API_KEY');
const apiBaseUrl = process.env.API_BASE_URL ?? throwConfigError('API_BASE_URL');
const assetUrl = process.env.ASSET_URL ?? throwConfigError('ASSET_URL');

export const config = {
  apiKey,
  apiBaseUrl,
  assetUrl,
};
