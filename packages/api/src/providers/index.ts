import { Provider, ProviderId } from "./types";
import { xProvider } from "./x";
import { linkedinProvider } from "./linkedin";
import { facebookProvider } from "./facebook";
import { instagramProvider } from "./instagram";

export const providers: Record<ProviderId, Provider> = {
  x: xProvider,
  linkedin: linkedinProvider,
  facebook: facebookProvider,
  instagram: instagramProvider
};

export function getProvider(id: string): Provider | undefined {
  return providers[id as ProviderId];
}
