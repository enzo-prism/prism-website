type CategoryKey =
  | "dentistry"
  | "retail"
  | "education"
  | "nonprofit"
  | "consulting"
  | "event"
  | "private resort"
  | "online community"
  | "it"
  | "default"

const CATEGORY_STYLES: Record<CategoryKey, { bg: string; border: string; text: string }> = {
  dentistry: { bg: "bg-[#f1f8ff]", border: "border-[#cfe5ff]", text: "text-[#1f4f91]" },
  retail: { bg: "bg-[#fff3e8]", border: "border-[#ffd9b8]", text: "text-[#a34b18]" },
  education: { bg: "bg-[#f7ecff]", border: "border-[#e7d4ff]", text: "text-[#5c3fa3]" },
  nonprofit: { bg: "bg-[#e7f9f1]", border: "border-[#c8eddc]", text: "text-[#1c6b4d]" },
  consulting: { bg: "bg-[#eaf1ff]", border: "border-[#d5e1ff]", text: "text-[#2b4ea0]" },
  event: { bg: "bg-[#fff7eb]", border: "border-[#ffdfb8]", text: "text-[#a45a16]" },
  "private resort": { bg: "bg-[#e9fcff]", border: "border-[#c9f2ff]", text: "text-[#146c82]" },
  "online community": { bg: "bg-[#f8ecff]", border: "border-[#e8d3ff]", text: "text-[#7a3fa5]" },
  it: { bg: "bg-[#e8f7ff]", border: "border-[#cdeeff]", text: "text-[#1a6a9b]" },
  default: { bg: "bg-neutral-100", border: "border-neutral-200", text: "text-neutral-700" },
}

export function getCategoryClasses(category?: string) {
  if (!category) return CATEGORY_STYLES.default
  const key = category.toLowerCase() as CategoryKey
  return CATEGORY_STYLES[key] ?? CATEGORY_STYLES.default
}

export function buildCategoryPillClasses(category?: string) {
  const { bg, border, text } = getCategoryClasses(category)
  return `${bg} ${border} ${text} inline-flex items-center justify-center rounded-full border px-3 py-1 text-[11px] font-semibold lowercase leading-tight tracking-tight`
}
