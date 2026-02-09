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
  dentistry: { bg: "bg-sky-500/10", border: "border-sky-400/30", text: "text-sky-200" },
  retail: { bg: "bg-amber-500/10", border: "border-amber-400/30", text: "text-amber-200" },
  education: { bg: "bg-orange-500/10", border: "border-orange-400/30", text: "text-orange-200" },
  nonprofit: { bg: "bg-emerald-500/10", border: "border-emerald-400/30", text: "text-emerald-200" },
  consulting: { bg: "bg-rose-500/10", border: "border-rose-400/30", text: "text-rose-200" },
  event: { bg: "bg-yellow-500/10", border: "border-yellow-400/30", text: "text-yellow-200" },
  "private resort": { bg: "bg-cyan-500/10", border: "border-cyan-400/30", text: "text-cyan-200" },
  "online community": { bg: "bg-purple-500/10", border: "border-purple-400/30", text: "text-purple-200" },
  it: { bg: "bg-blue-500/10", border: "border-blue-400/30", text: "text-blue-200" },
  default: { bg: "bg-muted/40", border: "border-border/60", text: "text-muted-foreground" },
}

export function getCategoryClasses(category?: string) {
  if (!category) return CATEGORY_STYLES.default
  const key = category.toLowerCase() as CategoryKey
  return CATEGORY_STYLES[key] ?? CATEGORY_STYLES.default
}

export function buildCategoryPillClasses(category?: string) {
  const { bg, border, text } = getCategoryClasses(category)
  return `${bg} ${border} ${text}`
}
