import { Provider, ProviderId } from "./types.js";
import { xProvider } from "./x.js";
import { linkedinProvider } from "./linkedin.js";
import { facebookProvider } from "./facebook.js";
import { instagramProvider } from "./instagram.js";

export const providers: Record<ProviderId, Provider> = {
  x: xProvider,
  linkedin: linkedinProvider,
  facebook: facebookProvider,
  instagram: instagramProvider
};

export function getProvider(id: string): Provider | undefined {
  return providers[id as ProviderId];
}
