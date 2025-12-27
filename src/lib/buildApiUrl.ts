import type { CounterMode, CounterTheme } from "@/components/Controls";

const BASE_URL = "https://moecounter.jawandha-moecounter.workers.dev/api/v2/moecounter";

interface BuildApiUrlParams {
  mode: CounterMode;
  theme: CounterTheme;
  number?: string;
  length: number;
}

export function buildApiUrl({ mode, theme, number, length }: BuildApiUrlParams): string {
  const params = new URLSearchParams();
  params.set("theme", theme);
  params.set("length", String(length));

  if (mode === "custom" && number) {
    params.set("number", number);
  }

  const endpoint = mode === "increment" ? `${BASE_URL}/increment` : BASE_URL;
  return `${endpoint}?${params.toString()}`;
}
