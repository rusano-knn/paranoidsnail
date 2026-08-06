import { readFileSync } from "node:fs";
import { join } from "node:path";
import yaml from "js-yaml";

export type Network = "clearnet" | "darknet";
export type Rating = 1 | 2 | 3;

export interface Category {
  id: string;
  label: string;
  tagline: string;
}

export interface Tool {
  name: string;
  description: string;
  categories: string[];
  network: Network;
  rating: Rating;
  url: string;
  openSource: boolean;
  lastChecked: string;
}

interface ToolsFile {
  categories: Category[];
  tools: Tool[];
}

let cache: ToolsFile | null = null;

export function getTools(): ToolsFile {
  if (cache) return cache;
  const path = join(process.cwd(), "data", "tools.yaml");
  const raw = readFileSync(path, "utf8");
  cache = yaml.load(raw) as ToolsFile;
  return cache;
}

export interface FilterParams {
  category?: string;
  q?: string;
  network?: string;
  source?: string;
}

export function filterTools(tools: Tool[], p: FilterParams): Tool[] {
  const { category, q, network, source } = p;
  return tools.filter((t) => {
    if (category && !t.categories.includes(category)) return false;
    if (network && t.network !== network) return false;
    if (source === "open" && !t.openSource) return false;
    if (q) {
      const s = q.toLowerCase();
      if (!`${t.name} ${t.description}`.toLowerCase().includes(s)) return false;
    }
    return true;
  });
}


