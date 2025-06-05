export function validateImageConfig(
  src: string,
  width?: number | string,
  height?: number | string,
  priority?: boolean,
  loading?: "lazy" | "eager",
  alt?: string,
) {
  const issues: string[] = []

  // Check if src is provided
  if (!src) {
    issues.push("Image src is required")
    return { status: "invalid", issues }
  }

  // Check if width and height are provided for local images
  if (src.startsWith("/") && (!width || !height)) {
    issues.push("Local images should have width and height specified")
  }

  // Check if alt text is provided
  if (alt === undefined || alt === "") {
    issues.push("Alt text is missing (use empty string for decorative images)")
  }

  // Check if priority images have loading="eager"
  if (priority && loading === "lazy") {
    issues.push("Priority images should not have loading='lazy'")
  }

  // Determine status based on issues
  if (issues.length === 0) {
    return { status: "valid", issues: [] }
  } else if (issues.some((issue) => issue.includes("required") || issue.includes("missing"))) {
    return { status: "invalid", issues }
  } else {
    return { status: "warning", issues }
  }
}
