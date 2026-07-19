export type SearchParamValue = string | string[] | null | undefined

export function firstSearchParamString(value: SearchParamValue, fallback = "") {
  if (typeof value === "string") return value
  if (Array.isArray(value)) {
    const firstString = value.find((item): item is string => typeof item === "string")
    return firstString ?? fallback
  }
  return fallback
}
