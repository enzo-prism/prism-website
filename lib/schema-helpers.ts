export const sanitizeReviewText = (text: string) =>
  text
    .replace(/\*\*/g, "")
    .replace(/[`_]/g, "")
    .replace(/\s+/g, " ")
    .trim()
