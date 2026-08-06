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


