import type { Network, Rating } from "@/lib/tools";

export const RATING_LABELS: Record<Rating, string> = {
  1: "Caution",
  2: "Trusted",
  3: "Highly trusted",
};

export const NETWORK_LABELS: Record<Network, string> = {
  clearnet: "Clearnet",
  darknet: ".onion",
};
