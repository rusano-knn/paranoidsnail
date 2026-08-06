import type { MDXComponents } from "mdx/types";

export function useMDXComponents(): MDXComponents {
  return {
    a: (props) => <a {...props} />,
  };
}
