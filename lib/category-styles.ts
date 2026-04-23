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

type CategoryStyle = { bg: string; border: string; text: string }

const DEFAULT_CATEGORY_STYLES: Record<CategoryKey, CategoryStyle> = {
  dentistry: {
    bg: "bg-sky-50 dark:bg-sky-500/10",
    border: "border-sky-200 dark:border-sky-400/30",
    text: "text-sky-700 dark:text-sky-200",
  },
  retail: {
    bg: "bg-amber-50 dark:bg-amber-500/10",
    border: "border-amber-200 dark:border-amber-400/30",
    text: "text-amber-700 dark:text-amber-200",
  },
  education: {
    bg: "bg-orange-50 dark:bg-orange-500/10",
    border: "border-orange-200 dark:border-orange-400/30",
    text: "text-orange-700 dark:text-orange-200",
  },
  nonprofit: {
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-200 dark:border-emerald-400/30",
    text: "text-emerald-700 dark:text-emerald-200",
  },
  consulting: {
    bg: "bg-rose-50 dark:bg-rose-500/10",
    border: "border-rose-200 dark:border-rose-400/30",
    text: "text-rose-700 dark:text-rose-200",
  },
  event: {
    bg: "bg-yellow-50 dark:bg-yellow-500/10",
    border: "border-yellow-200 dark:border-yellow-400/30",
    text: "text-yellow-800 dark:text-yellow-200",
  },
  "private resort": {
    bg: "bg-cyan-50 dark:bg-cyan-500/10",
    border: "border-cyan-200 dark:border-cyan-400/30",
    text: "text-cyan-700 dark:text-cyan-200",
  },
  "online community": {
    bg: "bg-purple-50 dark:bg-purple-500/10",
    border: "border-purple-200 dark:border-purple-400/30",
    text: "text-purple-700 dark:text-purple-200",
  },
  it: {
    bg: "bg-blue-50 dark:bg-blue-500/10",
    border: "border-blue-200 dark:border-blue-400/30",
    text: "text-blue-700 dark:text-blue-200",
  },
  default: {
    bg: "bg-slate-100/90 dark:bg-muted/40",
    border: "border-slate-200 dark:border-border/60",
    text: "text-slate-700 dark:text-muted-foreground",
  },
}

const LIGHT_CATEGORY_STYLES: Record<CategoryKey, CategoryStyle> = {
  dentistry: {
    bg: "bg-sky-50",
    border: "border-sky-200",
    text: "text-sky-700",
  },
  retail: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
  },
  education: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
  },
  nonprofit: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
  },
  consulting: {
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-700",
  },
  event: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-800",
  },
  "private resort": {
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    text: "text-cyan-700",
  },
  "online community": {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
  },
  it: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
  },
  default: {
    bg: "bg-slate-100/90",
    border: "border-slate-200",
    text: "text-slate-700",
  },
}

export function getCategoryClasses(
  category?: string,
  tone: "default" | "light" = "default",
) {
  const styleMap = tone === "light" ? LIGHT_CATEGORY_STYLES : DEFAULT_CATEGORY_STYLES
  if (!category) return styleMap.default
  const key = category.toLowerCase() as CategoryKey
  return styleMap[key] ?? styleMap.default
}

export function buildCategoryPillClasses(
  category?: string,
  tone: "default" | "light" = "default",
) {
  const { bg, border, text } = getCategoryClasses(category, tone)
  return `${bg} ${border} ${text}`
}
