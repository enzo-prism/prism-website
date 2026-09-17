#!/usr/bin/env node
/**
 * Render the wizard animation's first frame (packed-12 color ASCII) to a
 * static SVG poster used as the reduced-motion / no-JS / constrained-device
 * fallback.
 *
 * Usage: node scripts/generate-wizard-poster.mjs
 * Output: public/animations/wizard/poster.svg
 *
 * The decode mirrors lib/ascii-color.ts (kept dependency-free so this script
 * runs on plain Node without a TS loader). Cell geometry mirrors the canvas
 * renderer (CELL_W 7 x CELL_H 10, see the color path in
 * components/ascii/AsciiAnimation.tsx) so the still frames the same art at
 * the same size as the loop; letter-spacing pads the ~6px font advance out
 * to the 7px cell.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const mediumDir = join(root, 'public/animations/wizard/medium')
const outPath = join(root, 'public/animations/wizard/poster.svg')

const CELL_W = 7
const CELL_H = 10

function escapeXml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function main() {
  const meta = JSON.parse(readFileSync(join(mediumDir, 'meta.json'), 'utf8'))
  if (meta.frameEncoding !== 'packed-12' || meta.colorMode !== 'color') {
    throw new Error(`Unexpected wizard meta: ${meta.format}`)
  }
  const buf = readFileSync(join(mediumDir, 'frame_00001.bin'))
  if (buf.length < meta.bytesPerFrame) {
    throw new Error(`Short frame: ${buf.length} < ${meta.bytesPerFrame}`)
  }

  const { width: W, height: H, bitsPerColor } = meta
  const mask = (1 << bitsPerColor) - 1
  const glyphAt = (i) => {
    const o = Math.floor(i / 2) * 3
    const cell =
      i % 2 === 0
        ? (buf[o] << 4) | (buf[o + 1] >> 4)
        : ((buf[o + 1] & 0x0f) << 8) | buf[o + 2]
    return {
      ch: meta.charset[cell >> bitsPerColor] ?? ' ',
      color: meta.palette[cell & mask] ?? '#ffffff',
    }
  }

  const rows = []
  for (let r = 0; r < H; r += 1) {
    // Group consecutive same-color cells into runs; drop trailing spaces.
    const runs = []
    for (let c = 0; c < W; c += 1) {
      const { ch, color } = glyphAt(r * W + c)
      const last = runs[runs.length - 1]
      if (last && last.color === color) last.text += ch
      else runs.push({ color, text: ch })
    }
    while (runs.length > 0 && /^\s*$/.test(runs[runs.length - 1].text)) {
      runs.pop()
    }
    if (runs.length === 0) continue
    const tspans = runs
      .map(
        (run) => `<tspan fill="${escapeXml(run.color)}">${escapeXml(run.text)}</tspan>`,
      )
      .join('')
    rows.push(`  <text x="0" y="${(r + 1) * CELL_H}">${tspans}</text>`)
  }

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W * CELL_W}" height="${H * CELL_H}" viewBox="0 0 ${W * CELL_W} ${H * CELL_H}" role="img" aria-label="Wizard ASCII illustration">\n` +
    `<title>Wizard</title>\n` +
    `<g font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="${CELL_H}" letter-spacing="1" xml:space="preserve">\n` +
    `${rows.join('\n')}\n` +
    `</g>\n</svg>\n`

  writeFileSync(outPath, svg)
  console.log(`Wrote ${outPath} (${svg.length} bytes, ${rows.length} rows)`)
}

main()
