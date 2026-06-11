#!/usr/bin/env node
/**
 * Bundles per-frame ASCII animation files (frame_00001.txt …) into a single
 * frames.json per folder so the client can fetch one file instead of hundreds.
 * AsciiAnimation falls back to per-frame fetching when frames.json is absent,
 * so this is a pure optimization — re-run after adding or editing frames:
 *
 *   node scripts/build-ascii-frame-bundles.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ANIMATIONS_DIR = path.join(ROOT, 'public', 'animations')
const FRAME_PATTERN = /^frame_(\d+)\.txt$/

function findFrameDirs(dir) {
  const dirs = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  if (entries.some((entry) => entry.isFile() && FRAME_PATTERN.test(entry.name))) {
    dirs.push(dir)
  }
  for (const entry of entries) {
    if (entry.isDirectory()) {
      dirs.push(...findFrameDirs(path.join(dir, entry.name)))
    }
  }
  return dirs
}

let bundled = 0
for (const frameDir of findFrameDirs(ANIMATIONS_DIR)) {
  const frames = fs
    .readdirSync(frameDir)
    .map((name) => {
      const match = FRAME_PATTERN.exec(name)
      return match ? { index: Number(match[1]), name } : null
    })
    .filter(Boolean)
    .sort((a, b) => a.index - b.index)
    .map(({ name }) => fs.readFileSync(path.join(frameDir, name), 'utf8'))

  const outFile = path.join(frameDir, 'frames.json')
  fs.writeFileSync(outFile, JSON.stringify(frames))
  const sizeKb = Math.round(fs.statSync(outFile).size / 1024)
  console.log(
    `${path.relative(ROOT, outFile)} — ${frames.length} frames, ${sizeKb}kB`,
  )
  bundled += 1
}

console.log(`\nBundled ${bundled} animation folder(s).`)
