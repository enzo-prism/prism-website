import fs from "node:fs"
import path from "node:path"

/**
 * House copy rule: no em dashes in anything a visitor reads.
 *
 * Enzo has given this instruction repeatedly across clients and channels, and
 * settled it for this site on 2026-08-10 ("remove the M Dashes from the Prism
 * Website"). Use a comma, a period, a colon, or parentheses instead.
 *
 * This guard exists because the rule is invisible to a reviewer skimming a
 * diff: one pasted paragraph reintroduces it and nothing else complains.
 */

const REPO_ROOT = path.resolve(__dirname, "..")

const SCANNED_DIRS = ["app", "components", "content", "lib", "utils", "hooks"]
const SCANNED_EXTENSIONS = [".ts", ".tsx", ".mdx", ".md", ".json"]
const SKIPPED_DIRS = new Set(["node_modules", ".next", "__snapshots__"])

const EM_DASH = "—"

/** HTML and JSX escapes that render as an em dash just like the literal does. */
const ENCODED_EM_DASHES = ["&mdash;", "&#8212;", "&#x2014;", "&#X2014;", "\\u2014"]

/**
 * `lib/seo/rules.ts` is the one legitimate holder of the character: its regexes
 * strip dashes out of inbound page titles, so they have to contain one to match
 * one. Removing it there would break title normalization, not improve copy.
 */
const ALLOWED_FILES = new Set([path.join("lib", "seo", "rules.ts")])

/**
 * Verbatim records we do not get to edit. The house rule resolves the clash
 * between the site-wide ban and quote integrity by letting a quote lose its
 * dash (period, capitalize, nothing else) but never letting us touch a quote
 * that is a verbatim record of someone's own formatting. This is the named
 * example: an Instagram commenter's ASCII arrow, where the dash is a keystroke
 * rather than punctuation.
 *
 * Keep this list at exactly the lines that qualify. If it starts growing,
 * someone is using it to skip the rewrite.
 */
const ALLOWED_LINES: Array<{ file: string; contains: string }> = [
  {
    file: path.join("content", "wall-of-love-data.tsx"),
    contains: "Like this to bring me back",
  },
]

function isAllowedLine(file: string, line: string): boolean {
  return ALLOWED_LINES.some((allowed) => allowed.file === file && line.includes(allowed.contains))
}

/**
 * Comments never reach a visitor, so they are out of scope for a copy rule.
 * Encoded forms are still rejected everywhere, including comments, because
 * there is no reason to write `&mdash;` in a comment and it is the form most
 * likely to slip past a human reviewer.
 *
 * `//` only opens a comment when it is not the `//` inside a `://` URL.
 */
function stripCodeComments(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .map((line) => line.replace(/(^|[^:])\/\/.*$/, "$1"))
    .join("\n")
}

function collectFiles(dir: string, found: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIPPED_DIRS.has(entry.name)) continue
      collectFiles(path.join(dir, entry.name), found)
      continue
    }
    if (SCANNED_EXTENSIONS.includes(path.extname(entry.name))) {
      found.push(path.join(dir, entry.name))
    }
  }
  return found
}

function scannedFiles(): string[] {
  return SCANNED_DIRS.flatMap((dir) => {
    const absolute = path.join(REPO_ROOT, dir)
    return fs.existsSync(absolute) ? collectFiles(absolute) : []
  })
}

type Offence = { file: string; line: number; text: string }

function findOffences(matches: (line: string) => boolean, stripComments: boolean): Offence[] {
  const offences: Offence[] = []

  for (const absolute of scannedFiles()) {
    const relative = path.relative(REPO_ROOT, absolute)
    if (ALLOWED_FILES.has(relative)) continue

    const source = fs.readFileSync(absolute, "utf8")
    const isCodeFile = absolute.endsWith(".ts") || absolute.endsWith(".tsx")
    const searched = stripComments && isCodeFile ? stripCodeComments(source) : source

    searched.split("\n").forEach((line, index) => {
      if (isAllowedLine(relative, line)) return
      if (matches(line)) {
        offences.push({ file: relative, line: index + 1, text: line.trim().slice(0, 160) })
      }
    })
  }

  return offences
}

function report(offences: Offence[]): string {
  return offences.map((o) => `  ${o.file}:${o.line}\n    ${o.text}`).join("\n")
}

describe("Prism copy style", () => {
  it("scans a non-trivial number of files (guard against a silently empty sweep)", () => {
    expect(scannedFiles().length).toBeGreaterThan(200)
  })

  it("ships no em dashes in copy a visitor reads", () => {
    const offences = findOffences((line) => line.includes(EM_DASH), true)

    expect(
      offences.length === 0
        ? ""
        : `Found ${offences.length} em dash(es) in user-facing copy. ` +
          `Use a comma, period, colon, or parentheses instead.\n${report(offences)}`,
    ).toBe("")
  })

  it("ships no HTML-encoded em dashes anywhere in public source", () => {
    const offences = findOffences(
      (line) => ENCODED_EM_DASHES.some((encoded) => line.includes(encoded)),
      false,
    )

    expect(
      offences.length === 0
        ? ""
        : `Found ${offences.length} encoded em dash(es). These render identically ` +
          `to the literal character and are banned for the same reason.\n${report(offences)}`,
    ).toBe("")
  })
})
