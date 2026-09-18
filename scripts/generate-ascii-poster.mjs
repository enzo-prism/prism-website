#!/usr/bin/env node
/**
 * Render monochrome ASCII `.txt` frames to static SVG posters used as the
 * reduced-motion / no-JS / constrained-device fallback for the service heroes.
 *
 * Usage: node scripts/generate-ascii-poster.mjs
 *
 * The manifest below pins one curated frame per animation. Re-run after
 * re-exporting frames. (The color wizard poster has its own packed-12
 * renderer in scripts/generate-wizard-poster.mjs.)
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const animationsDir = join(root, 'public/animations')

const CELL_W = 6
const CELL_H = 10
const FILL = '#f5f0e8'

// animation, tier, 1-based frame number, poster label
const MANIFEST = [
  ['mail', 'medium', 28, 'Mail'],
  ['hands', 'medium', 76, 'Hands'],
  ['heart', 'medium', 16, 'Heart'],
  ['computer', 'medium', 40, 'Computer'],
  ['fire-2', 'medium', 47, 'Fire'],
  ['rocket', 'low', 1, 'Rocket'],
  ['planet', 'medium', 1, 'Planet'],
]

function escapeXml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function frameFileName(index) {
  return `frame_${String(index).padStart(5, '0')}.txt`
}

function renderPoster(animation, tier, frameNumber, label) {
  const source = join(
    animationsDir,
    animation,
    tier,
    frameFileName(frameNumber),
  )
  const content = readFileSync(source, 'utf8')
  const lines = content.split('\n')
  if (lines.length > 0 && lines[lines.length - 1] === '') lines.pop()

  const width = Math.max(...lines.map((line) => line.length))
  const rows = []
  lines.forEach((line, row) => {
    const text = line.replace(/\s+$/, '')
    if (text === '') return
    rows.push(
      `  <text x="0" y="${(row + 1) * CELL_H}">${escapeXml(text)}</text>`,
    )
  })

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width * CELL_W}" height="${lines.length * CELL_H}" viewBox="0 0 ${width * CELL_W} ${lines.length * CELL_H}" role="img" aria-label="${escapeXml(label)} ASCII illustration">\n` +
    `<title>${escapeXml(label)}</title>\n` +
    `<g fill="${FILL}" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="${CELL_H}" xml:space="preserve">\n` +
    `${rows.join('\n')}\n` +
    `</g>\n</svg>\n`

  const outPath = join(animationsDir, animation, 'poster.svg')
  writeFileSync(outPath, svg)
  console.log(`Wrote ${outPath} (${svg.length} bytes, ${rows.length} rows)`)
}

for (const [animation, tier, frameNumber, label] of MANIFEST) {
  renderPoster(animation, tier, frameNumber, label)
}
