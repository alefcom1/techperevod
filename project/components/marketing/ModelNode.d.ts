export interface ModelNodeProps {
  x?: number;
  y?: number;
  label: string;
  /** Colors western (GPT/Claude/DeepL, brand blue) vs local (YandexGPT/DeepSeek, turquoise) models. */
  kind?: "western" | "local";
  r?: number;
}

export function ModelNode(props: ModelNodeProps): JSX.Element;
